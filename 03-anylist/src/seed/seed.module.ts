import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { UsersModule } from 'src/users';
import { ItemsModule } from 'src/items';
import { ListsModule } from 'src/lists';
import { ListItemModule } from 'src/list-item';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [UsersModule, ItemsModule, ConfigModule, ListsModule, ListItemModule],
})
export class SeedModule {}
