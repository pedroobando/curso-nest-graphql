import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { Item } from 'src/items/entities';
import { List } from 'src/lists/entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'listItems' })
@InputType()
export class CreateListItemInput {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'numeric' })
  @Field(() => Number)
  quantity: number;

  @Column({ type: 'boolean' })
  @Field(() => Boolean)
  completed: boolean;

  //* Relations

  // list:List

  // item:Item
}
