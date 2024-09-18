import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { UsersModule } from 'src/users';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [UsersModule],
})
export class SeedModule {}