import { IsDateString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateWeightDto {
    @IsNotEmpty()
    @IsNumber()
    animalId: number;

    @IsNotEmpty()
    @IsDateString()
    date: string;

    @IsNotEmpty()
    @IsNumber()
    weight: number;

    @IsOptional()
    @IsNumber()
    userId?: number;
}
