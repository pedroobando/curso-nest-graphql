import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { Item } from './entities';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Item])],
  providers: [ItemsResolver, ItemsService],
  exports: [ItemsService, TypeOrmModule],
})
export class ItemsModule {}
