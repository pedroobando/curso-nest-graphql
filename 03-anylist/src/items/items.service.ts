import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { CreateItemInput, UpdateItemInput } from './dto/inputs';
import { Item } from './entities';
import { User } from 'src/users/entities';
import { PaginationArgs, SearchArgs } from 'src/common/dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItemInput: CreateItemInput, user: User): Promise<Item> {
    try {
      const item = this.itemRepository.create({
        ...createItemInput,
        user,
      });
      return await this.itemRepository.save(item);
    } catch (error) {
      this.handleDBExeptions(error);
    }
  }

  async findAll(user: User, paginationArgs: PaginationArgs, searchArgs: SearchArgs): Promise<Item[]> {
    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;

    const queryBuilder = this.itemRepository.createQueryBuilder();

    if (search) queryBuilder.andWhere('LOWER(name) like :name', { name: `%${search.toLowerCase()}%` });
    queryBuilder.take(limit).skip(offset).andWhere(`"userId" = :userId`, { userId: user.id });

    return await queryBuilder.getMany();

    //! La busqueda se complica en poco con el Like,
    //! ya que se desea buscar mayusculas y minisculas
    // return await this.itemRepository.find({
    //   take: limit,
    //   skip: offset,
    //   order: {
    //     name: {
    //       direction: 'ASC',
    //     },
    //   },
    //   where: {
    //     user: {
    //       id: user.id,
    //     },
    //     name: Like(`%${search.toLowerCase()}%`),
    //   },
    // });
  }

  async findOne(id: string, user: User): Promise<Item> {
    const theItem = await this.itemRepository.findOneBy({
      id,
      user: { id: user.id },
    });
    if (!theItem) throw new NotFoundException(`Item with id: ${id} not found`);
    return theItem;
  }

  async update(id: string, updateItemInput: UpdateItemInput, user: User): Promise<Item> {
    await this.findOne(id, user);
    const item = await this.itemRepository.preload(updateItemInput);
    if (!item) throw new NotFoundException(`Item with id: ${id} not found`);
    return this.itemRepository.save(item);
  }

  async remove(id: string, user: User): Promise<Item> {
    // Todo: Soft Delete, integridar referencial
    const item = await this.findOne(id, user);
    return await this.itemRepository.remove(item);
  }

  async itemCountByUser(user: User): Promise<number> {
    return await this.itemRepository.count({ where: { user: { id: user.id } } });
  }

  private handleDBExeptions(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    // this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
