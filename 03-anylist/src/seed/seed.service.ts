import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from 'src/users';

import { Item } from 'src/items/entities';
import { User } from 'src/users/entities';
import { SEED_ITEMS, SEED_USERS } from './data/data-seed';
import { ItemsService } from 'src/items';

@Injectable()
export class SeedService {
  private isProd: boolean = false;

  constructor(
    private readonly usersService: UsersService,
    private readonly itemsService: ItemsService,
    private readonly configService: ConfigService,

    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    this.isProd = this.configService.get('STATE') === 'prod';
  }

  async execute(): Promise<string> {
    if (this.isProd) throw new UnauthorizedException('We cannot run SEED on production');

    await this.deleteDatabase();

    const user = await this.loadUsers();

    const item = await this.loadItems(user);
    return `User create ${SEED_USERS.length} users with ${SEED_ITEMS.length} articles`;
    // return await this.usersService.executeSeed(userSeed);
  }

  private async deleteDatabase() {
    //* Borrar Items
    await this.itemsRepository.createQueryBuilder().delete().where({}).execute();

    //* Borrar Users
    await this.usersRepository.createQueryBuilder().delete().where({}).execute();

    return;
  }

  private async loadUsers(): Promise<User> {
    const users = [];
    for (const user of SEED_USERS) {
      users.push(await this.usersService.create({ ...user }));
    }

    return users[0];
  }

  private async loadItems(user: User): Promise<number> {
    const itemsPromises = [];
    for (const item of SEED_ITEMS) {
      itemsPromises.push(this.itemsService.create({ ...item }, user));
    }

    Promise.all(itemsPromises);
    return SEED_ITEMS.length;
  }
}
