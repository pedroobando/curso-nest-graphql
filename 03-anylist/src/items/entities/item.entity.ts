import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ListItem } from 'src/list-item/entities';
import { User } from 'src/users/entities';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'items' })
@ObjectType()
@Index(['id', 'user'], { unique: true })
export class Item {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  // @Column()
  // @Field(() => Float)
  // quantity: number;

  @Column({ nullable: false, default: 'meat' })
  @Field(() => String, { nullable: false })
  category: string;

  @Column({ nullable: true, default: 'und' })
  @Field(() => String, { nullable: true })
  quantityUnits?: string; //g, ml, kg, tsp

  @ManyToOne(() => User, (user) => user.items, { nullable: false, lazy: true })
  @Index('userId-index')
  @Field(() => User)
  user: User;

  @OneToMany(() => ListItem, (listItem) => listItem.item, { lazy: true })
  // @Index('listItemId-list-Index')
  @Field(() => [ListItem])
  listItem: ListItem[];
}
