import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ListItem } from './entities';
import { ListItemResolver } from './list-item.resolver';
import { ListItemService } from './list-item.service';

@Module({
  providers: [ListItemResolver, ListItemService],
  imports: [TypeOrmModule.forFeature([ListItem])],
  exports: [ListItemService, TypeOrmModule],
})
export class ListItemModule {}
