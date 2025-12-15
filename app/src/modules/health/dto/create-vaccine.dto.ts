import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVaccineDto {
    @ApiProperty({ description: 'ID of the animal (optional if applying to lote)', example: 1, required: false })
    @IsNumber()
    @IsOptional()
    animalId?: number;

    @ApiProperty({ description: 'ID of the lote (optional if applying to individual)', example: 5, required: false })
    @IsNumber()
    @IsOptional()
    lotId?: number;

    @ApiProperty({ description: 'Type/Name of the vaccine', example: 'Aftosa' })
    @IsString()
    @IsNotEmpty()
    type: string;

    @ApiProperty({ description: 'Date of application', example: '2023-11-01', required: false })
    @IsDateString()
    @IsOptional()
    applicationDate?: string;

    @ApiProperty({ description: 'Date of next application', example: '2024-05-01', required: false })
    @IsDateString()
    @IsOptional()
    nextDate?: string;

    @ApiProperty({ description: 'Notes', example: 'Routine checkup', required: false })
    @IsString()
    @IsOptional()
    note?: string;
}
