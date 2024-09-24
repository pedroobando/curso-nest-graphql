import { Injectable } from '@nestjs/common';
import { CreateListItemInput, UpdateListItemInput } from './dto/inputs';

@Injectable()
export class ListItemService {
  create(createListItemInput: CreateListItemInput) {
    return 'This action adds a new listItem';
  }

  findAll() {
    return `This action returns all listItem`;
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
