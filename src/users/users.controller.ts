import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto, updateUserDto } from './dtos/users.dto';
import { UserApiResponse } from './responses/users.response';
import { JwtAuthGuard } from '../commons/guards/jwtAuth.guard';
import { RolesGuard } from '../commons/guards/roles.guard';
import { Roles } from '../commons/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() dto: createUserDto): Promise<UserApiResponse> {
    const data = await this.usersService.createUser(dto);
    return { success: true, data };
  }

  @JwtAuthGuard()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Get()
  async getAllUsers(): Promise<UserApiResponse> {
    const data = await this.usersService.getAllUsers();
    return { success: true, data };
  }

  @JwtAuthGuard()
  @Get(':id')
  async getAUser(@Param('id') id: string): Promise<UserApiResponse> {
    const data = await this.usersService.getAUser(id);
    return { success: true, data };
  }

  @JwtAuthGuard()
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() dto: updateUserDto,
  ): Promise<UserApiResponse> {
    const data = await this.usersService.updateUser(id, dto);
    return { success: true, data };
  }

  @JwtAuthGuard()
  @Get('get-profile/:id')
  async getProfile(@Param('id') id: string) {
    const result = await this.usersService.getUserProfile(id);
    return result;
  }

  @JwtAuthGuard()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserApiResponse> {
    const data = await this.usersService.deleteUser(id);
    return { success: true, data, message: 'User deleted successfully' };
  }
}
