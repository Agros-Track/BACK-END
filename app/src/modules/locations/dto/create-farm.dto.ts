import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFarmDto {
    @ApiProperty({ description: 'Name of the farm', example: 'Hacienda La Gloria' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Description of the farm', example: 'Main dairy farm', required: false })
    @IsString()
    @IsOptional()
    description?: string;
}
