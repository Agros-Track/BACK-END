import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateTreatmentDto {
    @IsNumber()
    @IsNotEmpty()
    animalId: number;

    @IsNumber()
    @IsOptional()
    enfermedadId?: number;

    @IsString()
    @IsOptional()
    medicamento?: string;

    @IsString()
    @IsOptional()
    dosis?: string;

    @IsNumber()
    @IsOptional()
    duracionDias?: number;

    @IsDateString()
    @IsOptional()
    fechaInicio?: string;

    @IsString()
    @IsOptional()
    estado?: string;
}
