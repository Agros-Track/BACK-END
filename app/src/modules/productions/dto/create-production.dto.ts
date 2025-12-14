import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductionDto {
    @IsOptional()
    @IsNumber()
    animalId?: number;

    @IsOptional()
    @IsNumber()
    loteId?: number;

    @IsNotEmpty()
    @IsDateString()
    fecha: string;

    @IsNotEmpty()
    @IsString()
    productType: string;

    @IsNotEmpty()
    @IsNumber()
    cantidad: number;

    @IsNotEmpty()
    @IsString()
    unidad: string;

    @IsOptional()
    @IsString()
    originRoom?: string;

    @IsOptional()
    @IsNumber()
    userId?: number;
}
