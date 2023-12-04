import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Item } from './entities';
import { CreateItemInput } from './dto/inputs/create-item.input';
import { UpdateItemInput } from './dto/inputs/update-item.input';

@Injectable()
export class ItemsService {
  private readonly logger = new Logger(ItemsService.name);
  private defaultLimit: number;

  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,

    // @InjectRepository(ProductImage)
    // private readonly productImageRepository: Repository<ProductImage>,

    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {
    this.defaultLimit = configService.get<number>('defaultLimit');
  }

  async create(createItemInput: CreateItemInput): Promise<Item> {
    // const { ...itemDetails } = createItemInput;

    try {
      const item = this.itemRepository.create({
        ...createItemInput,
      });
      return await this.itemRepository.save(item);

      // return { ...item };
    } catch (error) {
      this.handleDBExeptions(error);
    }
  }

  async findAll(): Promise<Item[]> {
    // TODO: filtrar, paginar, por usuario
    return this.itemRepository.find();
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemRepository.findOneBy({ id });
    if (!item) throw new NotFoundException(`Item with id: ${id} not found`);

    return item;
  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {
    const item = await this.itemRepository.preload(updateItemInput);
    if (!item) throw new NotFoundException(`Item with id: ${id} not found`);
    return await this.itemRepository.save(item);
  }

  async remove(id: string): Promise<Item> {
    // TODO: soft Delete, integridad referencial
    const item = await this.findOne(id);
    await this.itemRepository.remove(item);
    return { ...item, id };
  }

  async deleteAllItems() {
    const queryItem = this.itemRepository.createQueryBuilder('item');

    try {
      return await queryItem.delete().where({}).execute();
    } catch (error) {
      this.handleDBExeptions(error);
    }
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
