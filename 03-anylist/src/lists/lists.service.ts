import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateListInput, UpdateListInput } from './dto/inputs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './entities';
import { User } from 'src/users/entities';
import { PaginationArgs, SearchArgs } from 'src/common/dto';
import { use } from 'passport';

@Injectable()
export class ListsService {
  private logger: Logger = new Logger('ListService');

  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) {}

  async create(createListInput: CreateListInput, user: User): Promise<List> {
    try {
      const newList = this.listRepository.create({ ...createListInput, user });
      return await this.listRepository.save(newList);
    } catch (error) {
      this.handleExeptions(error);
    }
  }

  async findAll(user: User, paginationArgs: PaginationArgs, searchArgs: SearchArgs): Promise<List[]> {
    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;

    const queryBuilder = this.listRepository.createQueryBuilder('List');

    if (search)
      queryBuilder.where('LOWER(List.name) like :name', { name: `%${search.toLowerCase().trim()}%` });
    queryBuilder.take(limit).skip(offset).andWhere(`"userId" = :userId`, { userId: user.id });

    return await queryBuilder.getMany();
  }

  async findOne(id: string, user: User): Promise<List> {
    const listOne = await this.listRepository.findOneBy({ id, user });
    if (!listOne) throw new NotFoundException(`List with id: ${id} not found`);
    return listOne;
  }

  async update(id: string, updateListInput: UpdateListInput, user: User): Promise<List> {
    await this.findOne(id, user);
    const listOne = await this.listRepository.preload(updateListInput);
    if (!listOne) throw new NotFoundException(`List with id: ${id} not found`);
    return this.listRepository.save(listOne);
  }

  async remove(id: string, user: User): Promise<List> {
    const listOne = await this.findOne(id, user);
    return await this.listRepository.remove(listOne);
  }

  // async activeSwicth(id: string, user: User): Promise<List> {
  //   const listOne = await this.findOne(id, user);
  //   listOne.isActive = !listOne.isActive;
  //   return await this.listRepository.save(listOne);
  // }

  async listCountByUser(user: User): Promise<number> {
    return await this.listRepository.count({ where: { user: { id: user.id } } });
  }

  private handleExeptions(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
