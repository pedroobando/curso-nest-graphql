import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, { description: 'Retorna un hola mundo', name: 'hello' })
  helloWorld(): string {
    return 'Hola mundo';
  }

  @Query(() => Float, {
    name: 'randomNumber',
    description: 'devuelve un numero aleatorio',
  })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, { name: 'randomFromZeroTo' })
  getRandomFromZeroTo(
    @Args('to', { nullable: true, type: () => Int }) to: number = 6,
  ): number {
    const randomNumber = Math.floor(Math.random() * to + 1);
    return randomNumber;
  }
}
