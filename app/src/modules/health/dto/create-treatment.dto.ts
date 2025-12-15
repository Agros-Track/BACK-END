import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTreatmentDto {
    @ApiProperty({ description: 'ID of the animal', example: 1 })
    @IsNumber()
    @IsNotEmpty()
    animalId: number;

    @ApiProperty({ description: 'ID of a related disease record', example: 10, required: false })
    @IsNumber()
    @IsOptional()
    diseaseId?: number;

    @ApiProperty({ description: 'Name of the medication', example: 'Antibiotic X', required: false })
    @IsString()
    @IsOptional()
    medication?: string;

    @ApiProperty({ description: 'Dosage', example: '5ml', required: false })
    @IsString()
    @IsOptional()
    dosage?: string;

    @ApiProperty({ description: 'Duration in days', example: 5, required: false })
    @IsNumber()
    @IsOptional()
    durationDays?: number;

    @ApiProperty({ description: 'Start date', example: '2023-11-01', required: false })
    @IsDateString()
    @IsOptional()
    startDate?: string;

    @ApiProperty({ description: 'Status of the treatment', example: 'in_progress', required: false })
    @IsString()
    @IsOptional()
    status?: string;
}
