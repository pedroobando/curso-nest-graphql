import { InputType, Int, Field, Float } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Max,
} from 'class-validator';

@InputType()
export class CreateItemInput {
  @Field(() => String, { description: 'Item fullname' })
  @IsNotEmpty()
  @IsString()
  name: string;

  // @Field(() => Float)
  // @IsPositive()
  // quantity: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  quantityUnits?: string; // g, ml, kg, tsp
}
