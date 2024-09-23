import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsResolver } from './lists.resolver';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([List])],
  providers: [ListsResolver, ListsService],
  exports: [ListsService],
})
export class ListsModule {}
