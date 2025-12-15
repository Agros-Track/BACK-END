import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({
    description: 'User email address',
    example: 'admin@demo.com',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'StrongPass123',
    minLength: 8,
    type: String,
  })
  @IsString()
  password: string;
}
