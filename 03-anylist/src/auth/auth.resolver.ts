import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation({ name: 'signup' })
  async signUp(/* singupInput */): Promise<> {
    return this.authService.signUp();
  }

  @Mutation({ name: 'login' })
  async login(/* singupInput */): Promise<> {
    return this.authService.login();
  }

  @Query({ name: 'revalidate' })
  async revalidToken(/* revalidateInput */): Promise<> {
    return this.authService.revalidate();
  }
}
