import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    name: 'hello',
    description: 'Hola mundo es lo que retorna',
  })
  helloWorld(): string {
    return 'Hola mundo';
  }

  @Query(() => Float, { name: 'randomNumber' })
  getRandomNumber(@Args('id', { defaultValue: 8, type: () => Int }) id?: number) {
    return Math.random() * id * 100;
  }

  @Query(() => Int, {
    name: 'randomZeroTo',
    description: 'Retorna un numero random de 1 al max - (default 6)',
  })
  getRandomFromZeroTo(@Args('max', { defaultValue: 6, type: () => Int }) max?: number): number {
    // Math.floor(Math.random() * (max - min + 1) + min)
    // const max = 10,
    const min = 0;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
