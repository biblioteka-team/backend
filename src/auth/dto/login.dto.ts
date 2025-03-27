import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'The email of the user trying to log in',
    example: 'john_doe@mail.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user trying to log in',
    example: 'password123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
