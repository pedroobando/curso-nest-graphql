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
        password: bcrypt.hashSync(signupInput.password, 10),
      });

      return await this.userRepository.save(newUser);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ email });
    } catch (error) {
      this.handleDBExceptions({ code: 'error-01', detail: `${email} not found` });
    }
  }

  async findOneById(id: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ id });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  // async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
  //   return new User();
  // }

  async block(id: string): Promise<User> {
    throw new Error('block, not implemented');
  }

  private handleDBExceptions(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(`Error ${error.detail.replace('Key ', '')}`);
    }
    if (error.code === 'error-01') {
      throw new NotFoundException(`Error ${error.detail}`);
    }

    // console.log({ error });
    this.logger.error(error);
    throw new InternalServerErrorException({ error });
  }
}
