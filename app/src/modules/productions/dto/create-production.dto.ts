import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductionDto {
    @ApiProperty({ description: 'ID of the animal (optional if associated with lote)', example: 1, required: false })
    @IsOptional()
    @IsNumber()
    animalId?: number;

    @ApiProperty({ description: 'ID of the lote (optional if associated with animal)', example: 5, required: false })
    @IsOptional()
    @IsNumber()
    lotId?: number;

    @ApiProperty({ description: 'Date of production', example: '2023-10-25' })
    @IsNotEmpty()
    @IsDateString()
    date: string;

    @ApiProperty({ description: 'Type of product', example: 'leche' })
    @IsNotEmpty()
    @IsString()
    productType: string;

    @ApiProperty({ description: 'Quantity produced', example: 25.5 })
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty({ description: 'Unit of measurement', example: 'litros' })
    @IsNotEmpty()
    @IsString()
    unit: string;

    @ApiProperty({ description: 'Origin room or location', example: 'Sala de ordeño 1', required: false })
    @IsOptional()
    @IsString()
    sourceLocation?: string;

    @ApiProperty({ description: 'ID of the user recording the production', example: 1, required: false })
    @IsOptional()
    @IsNumber()
    userId?: number;
}
