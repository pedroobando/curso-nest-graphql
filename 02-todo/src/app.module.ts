import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault as ApolloServerStudio } from '@apollo/server/plugin/landingPage/default';
import { HelloWorldModule } from './hello-world/hello-world.module';

import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      // sortSchema: true,
      plugins: [ApolloServerStudio()],
    }),
    HelloWorldModule,
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
