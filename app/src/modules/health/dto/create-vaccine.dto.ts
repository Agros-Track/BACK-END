import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateVaccineDto {
    @IsNumber()
    @IsOptional()
    animalId?: number;

    @IsNumber()
    @IsOptional()
    loteId?: number;

    @IsString()
    @IsNotEmpty()
    tipo: string;

    @IsDateString()
    @IsOptional()
    fechaAplicacion?: string;

    @IsDateString()
    @IsOptional()
    fechaProxima?: string;

    @IsString()
    @IsOptional()
    nota?: string;
}
