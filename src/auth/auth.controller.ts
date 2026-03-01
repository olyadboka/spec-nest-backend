import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from '../users/dtos/users.dto';
import { RegisterUserDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() dto: RegisterUserDto) {
    return await this.authService.registerUser(dto);
  }
  @Post('login')
  async userLogin(@Body() dto: RegisterUserDto) {
    return await this.authService.userLogin(dto);
  }
}
