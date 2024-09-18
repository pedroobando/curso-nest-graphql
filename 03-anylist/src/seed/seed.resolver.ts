import { Query, Resolver } from '@nestjs/graphql';
import { SeedService } from './seed.service';

@Resolver()
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}

  @Query(() => String, { name: 'executeSeed' })
  executeSeed(): Promise<string> {
    return this.seedService.execute();
  }
}
