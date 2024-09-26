import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from 'src/users';

import { Item } from 'src/items/entities';
import { User } from 'src/users/entities';
import { SEED_ITEMS, SEED_LISTS, SEED_USERS } from './data/data-seed';
import { ItemsService } from 'src/items';
import { List } from 'src/lists/entities';
import { ListItem } from 'src/list-item/entities';
import { ListsService } from 'src/lists';
import { ListItemService } from 'src/list-item';
import { match } from 'assert';

@Injectable()
export class SeedService {
  private isProd: boolean = false;

  constructor(
    private readonly usersService: UsersService,
    private readonly itemsService: ItemsService,
    private readonly configService: ConfigService,
    private readonly listsService: ListsService,
    private readonly listItemService: ListItemService,

    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(List)
    private readonly listsRepository: Repository<List>,

    @InjectRepository(ListItem)
    private readonly listItemRepository: Repository<ListItem>,
  ) {
    this.isProd = this.configService.get('STATE') === 'prod';
  }

  async execute(): Promise<string> {
    if (this.isProd) throw new UnauthorizedException('We cannot run SEED on production');

    await this.deleteDatabase();

    const user = await this.loadUsers();

    const items = await this.loadItems(user);

    const lists = await this.loadLists(user);

    await this.loadListItems(lists[0], items.slice(0, 10));
    await this.loadListItems(lists[1], items.slice(10, 20));
    await this.loadListItems(lists[2], items.slice(20, 30));

    return `User create ${SEED_USERS.length} users with ${SEED_ITEMS.length} articles and ${lists.length} list`;
    // return await this.usersService.executeSeed(userSeed);
  }

  private async deleteDatabase() {
    //* Borrar ListItem
    await this.listItemRepository.createQueryBuilder().delete().where({}).execute();

    //* Borrar List
    await this.listsRepository.createQueryBuilder().delete().where({}).execute();

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

  private async loadItems(user: User): Promise<Item[]> {
    const itemsPromises = [];
    for (const item of SEED_ITEMS) {
      itemsPromises.push(this.itemsService.create({ ...item }, user));
    }

    await Promise.all(itemsPromises);
    return await this.itemsService.findAll(user, { limit: 30, offset: 10 }, { search: null });
  }

  private async loadLists(user: User): Promise<List[]> {
    const listsPromise = [];
    for (const list of SEED_LISTS) {
      listsPromise.push(await this.listsService.create(list, user));
    }
    await Promise.all(listsPromise);
    return listsPromise;
  }

  private async loadListItems(list: List, items: Item[]) {
    const listItemPromise = [];

    for (const item of items) {
      listItemPromise.push(
        await this.listItemService.create({
          quantity: Math.round(Math.random() * 7),
          completed: Math.round(Math.random() * 1) === 0 ? false : true,
          itemId: item.id,
          listId: list.id,
        }),
      );
    }
    Promise.all(listItemPromise);
  }
}
