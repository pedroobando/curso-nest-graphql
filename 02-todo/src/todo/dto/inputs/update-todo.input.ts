import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int, { description: 'Id a buscar' })
  @IsInt({ message: 'Requerido el Id' })
  id: number;

  @Field(() => String, {
    nullable: true,
    description: 'What needs to be done.!',
  })
  @IsString({ message: 'Es requerido un string' })
  @MaxLength(50)
  @IsOptional()
  description?: string;

  @Field({ description: 'active todo', nullable: true })
  @IsBoolean()
  @IsOptional()
  done?: boolean;
}
