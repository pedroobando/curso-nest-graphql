import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';

import { Item } from './entities';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Item])],
  providers: [ItemsResolver, ItemsService],
})
export class ItemsModule {}
