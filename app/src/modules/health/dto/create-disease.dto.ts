import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateDiseaseDto {
    @IsNumber()
    @IsNotEmpty()
    animalId: number;

    @IsString()
    @IsOptional()
    sintomas?: string;

    @IsString()
    @IsOptional()
    diagnostico?: string;

    @IsString()
    @IsOptional()
    gravedad?: string;
}
