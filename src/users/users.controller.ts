import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dtos/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() dto: createUserDto) {}
}
