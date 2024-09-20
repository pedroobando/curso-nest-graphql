import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';

import { CreateItemInput, UpdateItemInput } from './dto/inputs';

import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { User } from 'src/users/entities';

import { JwtAuthGuard } from 'src/auth/guards';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

import { ValidRoles } from 'src/auth/enums';

@Resolver(() => Item)
@UseGuards(JwtAuthGuard)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item, { name: 'createItem' })
  createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,
    @CurrentUser([ValidRoles.user]) createUser: User,
  ): Promise<Item> {
    return this.itemsService.create(createItemInput, createUser);
  }

  @Query(() => [Item], { name: 'findAllItems' })
  findAll(@CurrentUser() findUser: User): Promise<Item[]> {
    return this.itemsService.findAll(findUser);
  }

  @Query(() => Item, { name: 'findOneItem' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() findUser: User,
  ): Promise<Item> {
    return this.itemsService.findOne(id, findUser);
  }

  @Mutation(() => Item, { name: 'updateItem' })
  updateItem(
    @Args('updateItemInput') updateItemInput: UpdateItemInput,
    @CurrentUser() activeUser: User,
  ): Promise<Item> {
    return this.itemsService.update(updateItemInput.id, updateItemInput, activeUser);
  }

  @Mutation(() => Item, { name: 'removeItem' })
  removeItem(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() activeUser: User,
  ): Promise<Item> {
    return this.itemsService.remove(id, activeUser);
  }
}
