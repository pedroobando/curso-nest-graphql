import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';

@ArgsType()
export class StatusArgs {
  @Field(() => Boolean, { nullable: true, description: 'Status a filtrar' })
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
