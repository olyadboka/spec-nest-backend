import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { createUserDto, updateUserDto } from './dtos/users.dto';
import { PrismaService } from '../prisma/prisma.service';
import bcrypt from 'bcrypt';

const userSelect = { id: true, username: true, email: true };

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(dto: createUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new UnauthorizedException('User with this email exists!');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: hashedPassword,
      },
      select: userSelect,
    });
    return user;
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: userSelect,
    });
  }

  async getAUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: userSelect,
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateUser(id: string, dto: updateUserDto) {
    await this.getAUser(id);
    if (dto.email) {
      const existing = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (existing && existing.id !== id) {
        throw new UnauthorizedException('User with this email already exists');
      }
    }
    const data: { username?: string; email?: string } = {
      ...(dto.username && { username: dto.username }),
      ...(dto.email && { email: dto.email }),
    };

    return this.prisma.user.update({
      where: { id },
      data,
      select: userSelect,
    });
  }

  async deleteUser(id: string) {
    await this.getAUser(id);
    return this.prisma.user.delete({
      where: { id },
      select: userSelect,
    });
  }
}
