import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Role name',
    example: 'Worker',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    description: 'Unique role identifier (auto-generated if not provided)',
    example: 'WORKER',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  slug?: string;

  @ApiPropertyOptional({
    description: 'Role description and responsibilities',
    example: 'Supervises daily farm operations',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
