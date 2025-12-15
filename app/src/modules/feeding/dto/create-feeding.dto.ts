import { IsString, IsNotEmpty, IsNumber, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedingDto {
    @ApiProperty({ description: 'Scope of application', enum: ['lote', 'animal'], example: 'lote' })
    @IsString()
    @IsNotEmpty()
    @IsEnum(['lote', 'animal'])
    appliesTo: string;

    @ApiProperty({ description: 'ID of the lote (required if applies to lote)', example: 5, required: false })
    @IsNumber()
    @IsOptional()
    lotId?: number;

    @ApiProperty({ description: 'ID of the animal (required if applies to animal)', example: 10, required: false })
    @IsNumber()
    @IsOptional()
    animalId?: number;

    @ApiProperty({ description: 'Type of food', example: 'Concentrado' })
    @IsString()
    @IsNotEmpty()
    feedType: string;

    @ApiProperty({ description: 'Quantity of food', example: 50.5 })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({ description: 'Unit of measurement', example: 'kg' })
    @IsString()
    @IsNotEmpty()
    unit: string;

    @ApiProperty({ description: 'Cost of the feeding', example: 150000, required: false })
    @IsNumber()
    @IsOptional()
    cost?: number;

    @ApiProperty({ description: 'Date and time of feeding', example: '2023-12-01T14:00:00Z', required: false })
    @IsDateString()
    @IsOptional()
    dateTime?: string;
}
