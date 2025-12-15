import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDiseaseDto {
    @ApiProperty({ description: 'ID of the animal', example: 1 })
    @IsNumber()
    @IsNotEmpty()
    animalId: number;

    @ApiProperty({ description: 'Symptoms description', example: 'Fever, loss of appetite', required: false })
    @IsString()
    @IsOptional()
    symptoms?: string;

    @ApiProperty({ description: 'Diagnosis', example: 'Flu', required: false })
    @IsString()
    @IsOptional()
    diagnosis?: string;

    @ApiProperty({ description: 'Severity', example: 'Moderate', required: false })
    @IsString()
    @IsOptional()
    severity?: string;
}
