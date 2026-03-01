import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto, UserLoginDto } from './dtos/auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import bcrypt from 'bcrypt';
import { CommonUtils } from '../commons/utils';
const userSelect = { id: true, username: true, email: true };
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async registerUser(dto: RegisterUserDto) {
    const existName = await this.prisma.user.findUnique({
      where: {
        email: dto.email.toLowerCase(),
      },
    });
    if (existName) {
      throw new BadRequestException('User already exists with this email');
    }

    const hashedPwd = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        username: dto.username.toLowerCase(),
        email: dto.email.toLowerCase(),
        password: hashedPwd,
      },
      select: userSelect,
    });
    return user;
  }

  async userLogin(userLoginDto: UserLoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userLoginDto.email.toLowerCase(),
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid username ');
    }

    const isPwdMatch = await bcrypt.compare(
      userLoginDto.password,
      user.password,
    );

    if (!isPwdMatch) {
      throw new BadRequestException('Invalid password ');
    }

    const jwtData = {
      id: user.id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const generatedToken = CommonUtils.generateJwtToken(jwtData);
    console.log(' GENERATED TOKEN:', generatedToken);

    return { accessToken: generatedToken };
  }
}
