import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './types';
import { LoginInput, SignupInput } from './dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards';
import { CurrentUser } from './decorators';
import { User } from 'src/users/entities';

@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signup' })
  async signup(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<AuthResponse> {
    return this.authService.signup(signupInput);
  }

  @Mutation(() => AuthResponse, { name: 'login' })
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AuthResponse> {
    return this.authService.login(loginInput);
  }

  @Query(() => AuthResponse, { name: 'revalite' })
  @UseGuards(JwtAuthGuard)
  revalidateToken(
    @CurrentUser(/**[ ValidRoles.admin ] */) user: User,
  ): AuthResponse {
    return this.authService.revalidateToken(user);
  }
}
