import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateItemInput {
  @Field(() => String, { description: 'Nombre de Item' })
  @IsString({ always: true })
  @IsNotEmpty()
  @MaxLength(25)
  name: string;

  @Field(() => Float, { description: 'Cantidad de Item' })
  @IsPositive()
  quantity: number;

  @Field(() => String, { description: 'Tipo de unidad medida' })
  @IsString()
  @IsOptional()
  quantityUnits?: string;
}
