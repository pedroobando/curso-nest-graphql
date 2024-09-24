import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsBoolean, MinLength } from 'class-validator';
import { ListItem } from 'src/list-item/entities';
import { User } from 'src/users/entities';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'lists' })
@ObjectType()
export class List {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, {})
  id: string;

  @Column()
  @MinLength(2, { message: 'El numero minimo de caracteres es dos (2)' })
  @Field(() => String)
  name: string;

  @Column({ type: 'boolean', default: true })
  @IsBoolean()
  @Field(() => Boolean)
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.lists, { nullable: false, lazy: true })
  @Index('userId-list-Index')
  @Field(() => User)
  user: User;

  @OneToMany(() => ListItem, (listItem) => listItem.list, { lazy: true })
  // @Index('listItemId-list-Index')
  @Field(() => [ListItem])
  listItem: ListItem[];
}
