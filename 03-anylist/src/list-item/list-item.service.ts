import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateListItemInput, UpdateListItemInput } from './dto/inputs';
import { PaginationArgs, SearchArgs } from 'src/common/dto';
import { ListItem } from './entities';
import { List } from 'src/lists/entities';

@Injectable()
export class ListItemService {
  constructor(
    @InjectRepository(ListItem)
    private readonly listItemsRepository: Repository<ListItem>,
  ) {}

  async create(createListItemInput: CreateListItemInput): Promise<ListItem> {
    const { itemId, listId, ...rest } = createListItemInput;

    const newListItem = this.listItemsRepository.create({
      ...rest,
      item: { id: itemId },
      list: { id: listId },
    });

    return await this.listItemsRepository.save(newListItem);
  }

  async findAll(list: List, paginationArgs: PaginationArgs, searchArgs: SearchArgs): Promise<ListItem[]> {
    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;

    const queryBuilder = this.listItemsRepository
      .createQueryBuilder('listItems')
      .innerJoin('listItems.item', 'item')
      .take(limit)
      .skip(offset)
      .where(`"listId" = :listId`, { listId: list.id });

    if (search) queryBuilder.andWhere('LOWER(item.name) like :name', { name: `%${search.toLowerCase()}%` });
    // queryBuilder.take(limit).skip(offset).andWhere(`"userId" = :userId`, { userId: user.id });

    return await queryBuilder.getMany();
  }

  async countItemsByList(list: List): Promise<number> {
    return await this.listItemsRepository.count({ where: { list: { id: list.id } } });
  }

  findOne(id: string) {
    return `This action returns a #${id} listItem`;
  }

  update(id: string, updateListItemInput: UpdateListItemInput) {
    return `This action updates a #${id} listItem`;
  }

  remove(id: string) {
    return `This action removes a #${id} listItem`;
  }
}
