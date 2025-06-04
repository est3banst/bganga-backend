import { IsEmail, IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsDateString()
  dob: string;

  @IsNotEmpty()
  @IsString()
  country: string;
}
