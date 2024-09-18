import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users';
import { userSeed } from './data/data-seed';

@Injectable()
export class SeedService {
  constructor(private readonly usersService: UsersService) {}

  async execute(): Promise<string> {
    return await this.usersService.executeSeed(userSeed);
  }
}
