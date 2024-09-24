import { Resolver, Query, Mutation, Args, ID, ResolveField, Int, Parent } from '@nestjs/graphql';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { UsersService } from './users.service';
import { ListsService } from 'src/lists';
import { ItemsService } from 'src/items/items.service';

import { User } from './entities/user.entity';
import { Item } from 'src/items/entities';
import { List } from 'src/lists/entities';

import { PaginationArgs, SearchArgs } from 'src/common/dto';

import { ValidRolesArgs } from './dto/args/roles.arg';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ValidRoles } from 'src/auth/enums';
import { ResetPassInput, UpdateUserInput } from './dto/inputs';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly itemsService: ItemsService,
    private readonly listsService: ListsService,
  ) {}

  @Query(() => [User], { name: 'users' })
  findAll(
    @Args() validRoles: ValidRolesArgs,
    @CurrentUser([ValidRoles.admin, ValidRoles.superUser]) user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<User[]> {
    console.log({ searchArgs });
    return this.usersService.findAll(validRoles.roles, paginationArgs, searchArgs);
  }

  @Query(() => User, { name: 'user' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser([ValidRoles.admin, ValidRoles.superUser]) user: User,
  ) {
    return this.usersService.findOneById(id);
  }

  @Mutation(() => User, { name: 'updateUser' })
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser([ValidRoles.admin]) user: User,
  ) {
    console.log({ updateUserInput });
    return this.usersService.update(updateUserInput, user);
  }

  @Mutation(() => User, { name: 'blockUser' })
  blockUser(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser([ValidRoles.admin]) user: User,
  ): Promise<User> {
    return this.usersService.block(id, user);
  }

  @Mutation(() => User, { name: 'resetPass' })
  resetPassWord(
    @Args('resetpassInput') resetPassInput: ResetPassInput,
    @CurrentUser([ValidRoles.admin]) adminUser: User,
  ): Promise<User> {
    return this.usersService.resetPassWord(resetPassInput, adminUser);
  }

  @ResolveField(() => Int, { name: 'itemCount' })
  async itemCount(@Parent() user: User, @CurrentUser([ValidRoles.admin]) activeUser: User): Promise<number> {
    return this.itemsService.itemCountByUser(user);
  }

  @ResolveField(() => Int, { name: 'listCount' })
  async listCount(@Parent() user: User, @CurrentUser([ValidRoles.admin]) activeUser: User): Promise<number> {
    return this.listsService.listCountByUser(user);
  }

  @ResolveField(() => [Item], { name: 'item' })
  async getItemByUser(
    @Parent() user: User,
    @CurrentUser([ValidRoles.admin]) activeUser: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<Item[]> {
    return this.itemsService.findAll(user, paginationArgs, searchArgs);
  }

  @ResolveField(() => [List], { name: 'list' })
  async getListByUser(
    @Parent() user: User,
    @CurrentUser([ValidRoles.user]) activeUser: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<List[]> {
    return this.listsService.findAll(user, paginationArgs, searchArgs);
  }
}
