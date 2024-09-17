import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from './guards';
import { AuthService } from './auth.service';
import { LoginInput, SignupInput } from './dto/inputs';
import { AuthResponse } from './types';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/users/entities';
import { ValidRoles } from './enums';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signup' })
  async signup(@Args('signupInput') signupInput: SignupInput): Promise<AuthResponse> {
    return this.authService.signup(signupInput);
  }

  @Mutation(() => AuthResponse, { name: 'login' })
  async login(@Args('loginInput') loginInput: LoginInput): Promise<AuthResponse> {
    return this.authService.login(loginInput);
  }

  @Query(() => AuthResponse, { name: 'revalidate' })
  @UseGuards(JwtAuthGuard)
  revalidateToken(@CurrentUser(/* [ValidRoles.admin] */) user: User): AuthResponse {
    return this.authService.revalidateToken(user);
  }
}
