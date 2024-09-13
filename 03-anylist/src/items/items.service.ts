import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { v4 as uuidV4 } from 'uuid';
import { CreateItemInput, UpdateItemInput } from './dto/inputs';
import { Item } from './entities';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,

    // @InjectRepository(ProductImage)
    // private readonly productImageRepository: Repository<ProductImage>,

    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {
    // this.defaultLimit = configService.get<number>('defaultLimit');
  }

  async create(createItemInput: CreateItemInput): Promise<Item> {
    try {
      const item = this.itemRepository.create({
        ...createItemInput,
      });
      return await this.itemRepository.save(item);
    } catch (error) {
      this.handleDBExeptions(error);
    }
  }

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async findOne(id: string): Promise<Item> {
    const theItem = await this.itemRepository.findOneBy({ id });
    if (!theItem) throw new NotFoundException(`Item with id: ${id} not found`);
    return theItem;
  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {
    const item = await this.itemRepository.preload(updateItemInput);
    if (!item) throw new NotFoundException(`Item with id: ${id} not found`);
    return this.itemRepository.save(item);
  }

  async remove(id: string) {
    // Todo: Soft Delete, integridar referencial
    const item = await this.findOne(id);
    await this.itemRepository.delete(item);
    return { ...item, id };
  }

  private handleDBExeptions(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    // this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
