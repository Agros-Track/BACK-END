import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'Juan Pérez',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Unique user email',
    example: 'juan.perez@farm1.com',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password (minimum 8 characters)',
    example: 'password123',
    minLength: 8,
    type: String,
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiPropertyOptional({
    description: 'Role ID assigned to the user',
    example: 2,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  role_id?: number;

  @ApiPropertyOptional({
    description: 'User status',
    enum: ['active', 'blocked'],
    example: 'active',
    default: 'active',
  })
  @IsOptional()
  @IsEnum(['active', 'blocked'])
  status?: 'active' | 'blocked';
}
