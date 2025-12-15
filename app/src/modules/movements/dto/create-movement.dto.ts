import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovementDto {
    @ApiProperty({ description: 'ID of the animal to move', example: 1 })
    @IsNumber()
    @IsNotEmpty()
    animalId: number;

    @ApiProperty({ description: 'ID of the destination lote', example: 10 })
    @IsNumber()
    @IsNotEmpty()
    loteDestinoId: number;

    @ApiProperty({ description: 'Note/Reason for movement', example: 'Rotación de pastos', required: false })
    @IsString()
    @IsOptional()
    nota?: string;
}
