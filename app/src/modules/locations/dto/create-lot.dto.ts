import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLotDto {
    @ApiProperty({ description: 'ID of the parent farm', example: 1 })
    @IsNumber()
    @IsNotEmpty()
    farmId: number;

    @ApiProperty({ description: 'Name of the lot', example: 'Lote 1 (Pasture)' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Type of lot', example: 'pasto', required: false })
    @IsString()
    @IsOptional()
    type?: string;

    @ApiProperty({ description: 'Description of the lot', example: 'Northern pasture', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'Coordinates (JSON or text representation)', required: false })
    @IsString()
    @IsOptional()
    coordinates?: string;

    @ApiProperty({ description: 'Status of the lot', example: 'activo', required: false })
    @IsString()
    @IsOptional()
    status?: string;
}
