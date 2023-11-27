import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int, { description: 'id find', nullable: false })
  @IsInt()
  @IsNotEmpty()
  id: number;

  @Field(() => String, { description: 'What needs to be done', nullable: true })
  @IsString({ message: 'description is required' })
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  done?: boolean;
}
