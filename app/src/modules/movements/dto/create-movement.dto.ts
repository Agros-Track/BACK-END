import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateMovementDto {
    @IsNumber()
    @IsNotEmpty()
    animalId: number;

    @IsNumber()
    @IsNotEmpty()
    loteDestinoId: number;

    @IsString()
    @IsOptional()
    nota?: string;
}
