import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/inputs';
import { AuthResponse } from './dto/types';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signup' })
  async signUp(
    @Args('singupInput') signupInput: SignupInput,
  ): Promise<AuthResponse> {
    return this.authService.signup(signupInput);
  }

  // @Mutation({ name: 'login' })
  // async login(/* singupInput */): Promise<> {
  //   return this.authService.login();
  // }

  // @Query({ name: 'revalidate' })
  // async revalidToken(/* revalidateInput */): Promise<> {
  //   return this.authService.revalidateToken();
  // }
}
