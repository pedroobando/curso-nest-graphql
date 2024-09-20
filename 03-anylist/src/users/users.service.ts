import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { SignupInput } from 'src/auth/dto/inputs';
import { IUserSeed } from 'src/seed/interfaces/user-seed.interface';
import { ValidRoles } from 'src/auth/enums';
import { ResetPassInput, UpdateUserInput } from './dto/inputs';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger('UserService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(signupInput: SignupInput): Promise<User> {
    try {
      const newUser = this.userRepository.create({
        ...signupInput,
        email: signupInput.email.toLowerCase().trim(),
        fullName: signupInput.fullName.trim(),
        password: this.bcryptPass(signupInput.password),
      });

      return await this.userRepository.save(newUser);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(roles: ValidRoles[]): Promise<User[]> {
    try {
      if (roles.length === 0)
        return await this.userRepository.find({
          // TODO: No es necesario porque tenemos lazy en la propiedad de lastUpdateBy ("user.entity.ts")
          //   relations: {
          //     lastUpdateBy: true,
          //   },
        });

      return await this.userRepository
        .createQueryBuilder('user')
        .andWhere('ARRAY[roles] && ARRAY[:...roles]')
        .setParameter('roles', roles)
        .getMany();
    } catch (error) {
      this.handleDBExceptions({ code: 'error-02', detail: ` not found` });
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ email });
    } catch (error) {
      this.handleDBExceptions({ code: 'error-01', detail: `User email: ${email} not found` });
    }
  }

  async findOneById(id: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ id });
    } catch (error) {
      this.handleDBExceptions({ code: 'error-01', detail: `User id: ${id} not found` });
    }
  }

  async update(updateUserInput: UpdateUserInput, updatedBy: User): Promise<User> {
    try {
      let user = await this.userRepository.preload({ ...updateUserInput });

      if (!user) throw new NotFoundException(`User with id: ${updateUserInput.id} not found`);
      user.email = user.email.toLowerCase().trim();
      user.fullName = user.fullName.trim();
      user.lastUpdateBy = updatedBy;

      return this.userRepository.save(user);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async block(id: string, adminUser: User): Promise<User> {
    const usertoBlock: User = await this.findOneById(id);
    usertoBlock.isActive = false;
    usertoBlock.lastUpdateBy = adminUser;
    return this.userRepository.save(usertoBlock);
  }

  async executeSeed(seedUser: IUserSeed[]): Promise<string> {
    const users: User[] = [];

    try {
      await this.deleteAllUsers();

      seedUser.forEach((user) => {
        user.email = user.email.toLowerCase().trim();
        user.fullName = user.fullName.trim();
        user.password = this.bcryptPass(user.password);
        users.push(this.userRepository.create({ ...user }));
      });

      const dbUsers = await this.userRepository.save(users);

      return `Insert ${dbUsers.length} record in database.`;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async resetPassWord({ id, password }: ResetPassInput, user: User): Promise<User> {
    const resetUser = await this.findOneById(id);
    resetUser.isActive = true;
    resetUser.password = this.bcryptPass(password);
    resetUser.lastUpdateBy = user;
    return this.userRepository.save(resetUser);
  }

  private bcryptPass(password: string): string {
    return bcrypt.hashSync(password.trim(), 10);
  }

  private async deleteAllUsers() {
    const queryUser = this.userRepository.createQueryBuilder('user');

    try {
      return await queryUser.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(`Error ${error.detail.replace('Key ', '')}`);
    }
    if (error.code === 'error-01') {
      throw new NotFoundException(`${error.detail}`);
    }

    this.logger.error(error);
    throw new InternalServerErrorException({ error });
  }
}
