import { IsDateString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWeightDto {
    @ApiProperty({ description: 'ID of the animal to weigh', example: 1 })
    @IsNotEmpty()
    @IsNumber()
    animalId: number;

    @ApiProperty({ description: 'Date of the weighing', example: '2023-10-25' })
    @IsNotEmpty()
    @IsDateString()
    date: string;

    @ApiProperty({ description: 'Weight value', example: 450.5 })
    @IsNotEmpty()
    @IsNumber()
    weight: number;

    @ApiProperty({ description: 'ID of the user recording the weight', example: 1, required: false })
    @IsOptional()
    @IsNumber()
    userId?: number;
}
