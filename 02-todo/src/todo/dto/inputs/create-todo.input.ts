import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: 'What needs to be done' })
  @IsString({ message: 'description is required' })
  @IsNotEmpty()
  description: string;
}
