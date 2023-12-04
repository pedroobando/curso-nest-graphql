import { Injectable, Logger } from '@nestjs/common';
import { SignupInput } from './dto/inputs';
import { AuthResponse } from './dto/types';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly usersService: UsersService) {}

  async signup(signupInput: SignupInput): Promise<AuthResponse> {
    const user = await this.usersService.create(signupInput);

    const token = 'ABCD1234';

    return {
      token,
      user,
    };
  }
}
