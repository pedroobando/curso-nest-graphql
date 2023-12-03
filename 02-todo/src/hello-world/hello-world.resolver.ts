import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, { name: 'hello', description: 'Hola mundo es lo que retorna siempre' })
  helloWorld(): string {
    return 'Hola mundo...!!';
  }

  @Query(() => Float, { name: 'randomNumber' })
  getRandomNumber(): number {
    return Math.random() * 100;
  }
  @Query(() => Int, {
    name: 'randomFromZeroTo',
    description: 'From zero to argument TO (default To 6)',
  })
  getRandomFromZeroTo(
    @Args('to', { type: () => Int, defaultValue: 6, nullable: true })
    to: number,
  ): number {
    return Math.floor(Math.random() * to) + 1;
  }
}
