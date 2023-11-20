import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsString({ message: 'Debe contener caracteres string' })
  @IsNotEmpty()
  @MinLength(4, { message: 'La descripcion debe contener minimo 4 caracteres' })
  description: string;
}
