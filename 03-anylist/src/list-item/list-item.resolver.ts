import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

import { ListItemService } from './list-item.service';
import { CreateListItemInput, UpdateListItemInput } from './dto/inputs';
import { ListItem } from './entities';

@Resolver(() => ListItem)
export class ListItemResolver {
  constructor(private readonly listItemService: ListItemService) {}

  @Mutation(() => ListItem)
  createListItem(@Args('createListItemInput') createListItemInput: CreateListItemInput) {
    return this.listItemService.create(createListItemInput);
  }

  @Query(() => [ListItem], { name: 'listItem' })
  findAll() {
    return this.listItemService.findAll();
  }

  @Query(() => ListItem, { name: 'listItem' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.listItemService.findOne(id);
  }

  @Mutation(() => ListItem)
  updateListItem(@Args('updateListItemInput') updateListItemInput: UpdateListItemInput) {
    return this.listItemService.update(updateListItemInput.id, updateListItemInput);
  }

  @Mutation(() => ListItem)
  removeListItem(@Args('id', { type: () => ID }) id: string) {
    return this.listItemService.remove(id);
  }
}
