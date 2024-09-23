import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateListInput {
  @Field(() => String, { description: 'nombre de la lista' })
  @IsString({ always: true })
  @IsNotEmpty()
  @MinLength(2, { message: 'El nombre minimo de la lista debe contener dos (2) o mas caracteres' })
  name: string;
}
