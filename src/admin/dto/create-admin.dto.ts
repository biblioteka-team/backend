import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    description: 'The username of the admin',
    example: 'admin',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The password of the admin',
    example: 'password123',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The email of the admin',
    example: 'admin@example.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
