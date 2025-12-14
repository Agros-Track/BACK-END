import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    titulo: string;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsOptional()
    @IsNumber()
    assignedUserId?: number;

    @IsOptional()
    @IsNumber()
    loteId?: number;

    @IsOptional()
    @IsNumber()
    animalId?: number;

    @IsOptional()
    @IsDateString()
    fecha?: string;

    @IsOptional()
    @IsString()
    hora?: string;

    @IsOptional()
    @IsString()
    estado?: string;
}
