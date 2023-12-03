import { Injectable } from '@nestjs/common';
import { CreateUserInput, UpdateUserInput } from './dto/inputs';
import { User } from './entities';

@Injectable()
export class UsersService {
  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
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
}
