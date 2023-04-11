import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id: number;

  @Field(() => String, { description: 'What needs to be done', nullable: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @IsOptional()
  description?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
