import { IsString, IsNotEmpty, IsNumber, IsOptional, IsEnum, IsDateString } from 'class-validator';

export class CreateFeedingDto {
    @IsString()
    @IsNotEmpty()
    @IsEnum(['lote', 'animal'])
    aplicaA: string;

    @IsNumber()
    @IsOptional()
    loteId?: number;

    @IsNumber()
    @IsOptional()
    animalId?: number;

    @IsString()
    @IsNotEmpty()
    tipoAlimento: string;

    @IsNumber()
    @IsNotEmpty()
    cantidad: number;

    @IsString()
    @IsNotEmpty()
    unidad: string;

    @IsNumber()
    @IsOptional()
    costo?: number;

    @IsDateString()
    @IsOptional()
    fechaHora?: string;
}
