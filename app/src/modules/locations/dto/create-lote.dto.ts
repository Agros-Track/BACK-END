import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateLoteDto {
    @IsNumber()
    @IsNotEmpty()
    fincaId: number;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsOptional()
    tipo?: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsString()
    @IsOptional()
    coordenadas?: string;

    @IsString()
    @IsOptional()
    estado?: string;
}
