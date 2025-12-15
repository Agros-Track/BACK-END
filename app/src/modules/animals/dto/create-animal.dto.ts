import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnimalDto {
    @ApiProperty({ description: 'ID of the farm', example: 1 })
    @IsNumber()
    @IsNotEmpty()
    farmId: number;

    @ApiProperty({ description: 'ID of the lot', example: 5, required: false })
    @IsNumber()
    @IsOptional()
    lotId?: number;

    @ApiProperty({ description: 'Unique code/tag of the animal', example: 'CO-12345' })
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty({ description: 'Type of animal', example: 'cow', required: false })
    @IsString()
    @IsOptional()
    type?: string;

    @ApiProperty({ description: 'Breed of the animal', example: 'Holstein', required: false })
    @IsString()
    @IsOptional()
    breed?: string;

    @ApiProperty({ description: 'Gender of the animal', example: 'F', required: false })
    @IsString()
    @IsOptional()
    sex?: string;

    @ApiProperty({ description: 'Date of birth', example: '2020-01-01', required: false })
    @IsDateString()
    @IsOptional()
    birthDate?: string;

    @ApiProperty({ description: 'URL of the animal photo', required: false })
    @IsString()
    @IsOptional()
    photoUrl?: string;

    @ApiProperty({ description: 'Status of the animal', example: 'active', required: false })
    @IsString()
    @IsOptional()
    status?: string;
}
