import { IsEmail, IsString } from 'class-validator';

export class createUserDto {
  @IsString()
  username: String;
  @IsString()
  @IsEmail()
  email: String;
  @IsString()
  password: String;
}
