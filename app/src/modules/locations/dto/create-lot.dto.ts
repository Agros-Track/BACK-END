import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLoteDto {
    @ApiProperty({ description: 'ID of the parent farm', example: 1 })
    @IsNumber()
    @IsNotEmpty()
    fincaId: number;

    @ApiProperty({ description: 'Name of the lot', example: 'Lote 1 (Pasture)' })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ description: 'Type of lot', example: 'pasto', required: false })
    @IsString()
    @IsOptional()
    tipo?: string;

    @ApiProperty({ description: 'Description of the lot', example: 'Northern pasture', required: false })
    @IsString()
    @IsOptional()
    descripcion?: string;

    @ApiProperty({ description: 'Coordinates (JSON or text representation)', required: false })
    @IsString()
    @IsOptional()
    coordenadas?: string;

    @ApiProperty({ description: 'Status of the lot', example: 'activo', required: false })
    @IsString()
    @IsOptional()
    estado?: string;
}
