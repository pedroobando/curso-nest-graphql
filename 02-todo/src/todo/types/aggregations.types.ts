import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Todo quick aggregations' })
export class AggregationsTypes {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  pending: number;

  @Field(() => Int)
  completed: number;

  @Field(() => Int, { deprecationReason: 'Most use complete ' })
  todoCompleted: number;
}
