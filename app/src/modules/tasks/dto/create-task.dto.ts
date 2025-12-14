import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
    @ApiProperty({ description: 'Title of the task', example: 'Vaccination Lote 1' })
    @IsNotEmpty()
    @IsString()
    titulo: string;

    @ApiProperty({ description: 'Description of the task', example: 'Apply vaccine against foot-and-mouth disease', required: false })
    @IsOptional()
    @IsString()
    descripcion?: string;

    @ApiProperty({ description: 'ID of the user assigned to the task', example: 1, required: false })
    @IsOptional()
    @IsNumber()
    assignedUserId?: number;

    @ApiProperty({ description: 'ID of the lote related to the task', example: 5, required: false })
    @IsOptional()
    @IsNumber()
    loteId?: number;

    @ApiProperty({ description: 'ID of the animal related to the task', example: 10, required: false })
    @IsOptional()
    @IsNumber()
    animalId?: number;

    @ApiProperty({ description: 'Due date of the task', example: '2023-12-01', required: false })
    @IsOptional()
    @IsDateString()
    fecha?: string;

    @ApiProperty({ description: 'Time of the task', example: '14:00:00', required: false })
    @IsOptional()
    @IsString()
    hora?: string;

    @ApiProperty({ description: 'Status of the task', example: 'pendiente', required: false, default: 'pendiente' })
    @IsOptional()
    @IsString()
    estado?: string;
}
