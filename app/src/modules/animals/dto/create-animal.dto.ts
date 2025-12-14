import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDateString, IsEnum } from 'class-validator';

export class CreateAnimalDto {
    @IsNumber()
    @IsNotEmpty()
    fincaId: number;

    @IsNumber()
    @IsOptional()
    loteId?: number;

    @IsString()
    @IsNotEmpty()
    codigo: string;

    @IsString()
    @IsOptional()
    tipo?: string;

    @IsString()
    @IsOptional()
    raza?: string;

    @IsString()
    @IsOptional()
    sexo?: string;

    @IsDateString()
    @IsOptional()
    fechaNacimiento?: string;

    @IsString()
    @IsOptional()
    fotoUrl?: string;

    @IsString()
    @IsOptional()
    estado?: string;
}
