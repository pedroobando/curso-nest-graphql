import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  exports: [UsersService],
})
export class UsersModule {}
