<<<<<<< HEAD
export class CreateAnimalDto {}
=======
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnimalDto {
    @ApiProperty({ description: 'ID of the farm (finca)', example: 1 })
    @IsNumber()
    @IsNotEmpty()
    fincaId: number;

    @ApiProperty({ description: 'ID of the lot (lote)', example: 5, required: false })
    @IsNumber()
    @IsOptional()
    loteId?: number;

    @ApiProperty({ description: 'Unique code/tag of the animal', example: 'CO-12345' })
    @IsString()
    @IsNotEmpty()
    codigo: string;

    @ApiProperty({ description: 'Type of animal', example: 'cow', required: false })
    @IsString()
    @IsOptional()
    tipo?: string;

    @ApiProperty({ description: 'Breed of the animal', example: 'Holstein', required: false })
    @IsString()
    @IsOptional()
    raza?: string;

    @ApiProperty({ description: 'Gender of the animal', example: 'F', required: false })
    @IsString()
    @IsOptional()
    sexo?: string;

    @ApiProperty({ description: 'Date of birth', example: '2020-01-01', required: false })
    @IsDateString()
    @IsOptional()
    fechaNacimiento?: string;

    @ApiProperty({ description: 'URL of the animal photo', required: false })
    @IsString()
    @IsOptional()
    fotoUrl?: string;

    @ApiProperty({ description: 'Status of the animal', example: 'activo', required: false })
    @IsString()
    @IsOptional()
    estado?: string;
}
>>>>>>> feature/modules
