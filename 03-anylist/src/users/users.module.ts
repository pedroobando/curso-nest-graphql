import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemsModule } from 'src/items/items.module';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [ConfigModule, TypeOrmModule.forFeature([User]), ItemsModule],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
