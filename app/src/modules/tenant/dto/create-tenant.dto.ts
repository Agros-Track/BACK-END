import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTenantDto {
  @ApiProperty({
    description: 'Organization/tenant name',
    example: 'Finca El Paraíso',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    description: 'Organization logo URL',
    example: 'https://example.com/logo.png',
    maxLength: 512,
  })
  @IsOptional()
  @IsString()
  @MaxLength(512)
  logo?: string;

  @ApiPropertyOptional({
    description: 'Organization country',
    example: 'Colombia',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;

  @ApiPropertyOptional({
    description: 'Timezone',
    example: 'America/Bogota',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  timezone?: string;

  @ApiPropertyOptional({
    description: 'Measurement system (metric/imperial)',
    example: 'metric',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  measurement_units?: string;

  @ApiPropertyOptional({
    description: 'Preferred language',
    example: 'es',
    maxLength: 10,
  })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  language?: string;

  @ApiPropertyOptional({
    description: 'Subscription plan',
    example: 'premium',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  plan?: string;

  @ApiPropertyOptional({
    description: 'Maximum animal limit',
    example: 500,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  animal_limit?: number;

  @ApiPropertyOptional({
    description: 'Maximum user limit',
    example: 10,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  user_limit?: number;
}
