import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { CreateListItemInput } from './';

@InputType()
export class UpdateListItemInput extends PartialType(CreateListItemInput) {
  @Field(() => ID)
  id: string;
}
