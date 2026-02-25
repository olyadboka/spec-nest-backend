import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto, updateUserDto } from './dtos/users.dto';
import { UserApiResponse } from './responses/users.response';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() dto: createUserDto): Promise<UserApiResponse> {
    const data = await this.usersService.createUser(dto);
    return { success: true, data };
  }

  @Get()
  async getAllUsers(): Promise<UserApiResponse> {
    const data = await this.usersService.getAllUsers();
    return { success: true, data };
  }

  @Get(':id')
  async getAUser(@Param('id') id: string): Promise<UserApiResponse> {
    const data = await this.usersService.getAUser(id);
    return { success: true, data };
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() dto: updateUserDto,
  ): Promise<UserApiResponse> {
    const data = await this.usersService.updateUser(id, dto);
    return { success: true, data };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserApiResponse> {
    const data = await this.usersService.deleteUser(id);
    return { success: true, data, message: 'User deleted successfully' };
  }
}
