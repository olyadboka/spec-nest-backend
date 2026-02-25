import { IsEmail, IsString, IsOptional } from 'class-validator';

export class createUserDto {
  @IsString()
  username: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}

export class updateUserDto {
  @IsOptional()
  @IsString()
  username?: string;
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsString()
  password?: string;
}
