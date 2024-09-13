import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { LoginInput, SignupInput } from './dto/inputs';
import { AuthResponse } from './types';

import { UsersService } from 'src/users';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private getJwtToken(id: string) {
    return this.jwtService.sign({ sub: id });
  }

  async signup(signupInput: SignupInput): Promise<AuthResponse> {
    // console.log({ signupInput });

    const user = await this.usersService.create(signupInput);

    const token = this.getJwtToken(user.id);

    return { token, user };
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { email, password } = loginInput;
    const user = await this.usersService.findOneByEmail(email);

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException(`Email / Password do not match`);
    }

    const token = this.getJwtToken(user.id);

    return {
      token,
      user,
    };
  }
}
