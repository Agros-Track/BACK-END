import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFincaDto {
    @ApiProperty({ description: 'Name of the farm', example: 'Hacienda La Gloria' })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ description: 'Description of the farm', example: 'Main dairy farm', required: false })
    @IsString()
    @IsOptional()
    descripcion?: string;
}
