import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CreateItemInput } from './create-item.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field(() => String, { description: 'Item ID' })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}
