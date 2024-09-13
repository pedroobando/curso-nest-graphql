import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: 'What needs to be done.!' })
  @IsString({ message: 'Es requerido un string' })
  @IsNotEmpty()
  @MaxLength(20)
  description: string;

  // @Field({ description: 'active todo', nullable: true })
  // done?: boolean;
}
