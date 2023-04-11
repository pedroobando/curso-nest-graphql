import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  @Field(() => Int, { description: 'Numero identificador' })
  id: number;

  @Field(() => String, { description: 'description works todo' })
  description: string;

  @Field(() => Boolean, { description: 'work completed or finished', defaultValue: false })
  done: boolean = false;
}
