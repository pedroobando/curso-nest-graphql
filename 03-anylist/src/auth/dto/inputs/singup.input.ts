import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class SignupInput {
  @Field(() => String, { description: 'User name' })
  @IsString()
  @MinLength(4, { message: 'Name minimo de 4 caracteres' })
  fullName: string;

  @Field(() => String, { description: 'Email for user' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'Password for user' })
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}
