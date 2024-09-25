import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ID, ResolveField, Parent } from '@nestjs/graphql';
import { ListsService } from './lists.service';

import { JwtAuthGuard } from 'src/auth/guards';

import { List } from './entities';
import { CreateListInput, UpdateListInput } from './dto/inputs';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ValidRoles } from 'src/auth/enums';
import { User } from 'src/users/entities';
import { PaginationArgs, SearchArgs } from 'src/common/dto';
import { ListItem } from 'src/list-item/entities';
import { ListItemService } from 'src/list-item';

@Resolver(() => List)
@UseGuards(JwtAuthGuard)
export class ListsResolver {
  constructor(
    private readonly listsService: ListsService,
    private readonly listItemService: ListItemService,
  ) {}

  @Mutation(() => List, { name: 'listCreate' })
  createList(@Args('createListInput') createListInput: CreateListInput, @CurrentUser([]) createUser: User) {
    return this.listsService.create(createListInput, createUser);
  }

  @Query(() => [List], { name: 'listFindAll' })
  findAll(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
    @CurrentUser() currentUser: User,
  ): Promise<List[]> {
    return this.listsService.findAll(currentUser, paginationArgs, searchArgs);
  }

  @Query(() => List, { name: 'listFindOne' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() currentUser: User,
  ): Promise<List> {
    return this.listsService.findOne(id, currentUser);
  }

  @Mutation(() => List, { name: 'listUpdate' })
  updateList(
    @Args('updateListInput') updateListInput: UpdateListInput,
    @CurrentUser() activeUser: User,
  ): Promise<List> {
    return this.listsService.update(updateListInput.id, updateListInput, activeUser);
  }

  @Mutation(() => List, { name: 'listRemove' })
  removeList(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser([ValidRoles.admin, ValidRoles.superUser]) activeUser: User,
  ) {
    return this.listsService.remove(id, activeUser);
  }

  @ResolveField(() => [ListItem], { name: 'items' })
  async getListItems(
    @Parent() list: List,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<ListItem[]> {
    return this.listItemService.findAll(list, paginationArgs, searchArgs);
  }

  @ResolveField(() => Number, { name: 'totalItems' })
  async countListItemsByList(@Parent() list: List): Promise<number> {
    return this.listItemService.countItemsByList(list);
  }

  // @Query(() => List, { name: 'listActiveSwicth' })
  // activeList(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string, @CurrentUser() activeUser: User) {
  //   return this.listsService.activeSwicth(id, activeUser);
  // }
}
