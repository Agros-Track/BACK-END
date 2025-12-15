import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFincaDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsOptional()
    descripcion?: string;
}
