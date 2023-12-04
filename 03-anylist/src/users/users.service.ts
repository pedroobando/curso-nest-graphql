import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserInput, UpdateUserInput } from './dto/inputs';
import { User } from './entities';
import { SignupInput } from 'src/auth/dto/inputs';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(singupInput: SignupInput): Promise<User> {
    try {
      const newUser = this.userRepository.create({
        ...singupInput,
      });
      return await this.userRepository.save(newUser);
    } catch (error) {
      this.handleDBExeptions(error);
    }
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  async findOne(id: string): Promise<User> {
    throw new Error('Block method not implemente');
    return new User();
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    return new User();
  }

  async block(id: string): Promise<User> {
    throw new Error('Block method not implemente');
  }

  private handleDBExeptions(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
