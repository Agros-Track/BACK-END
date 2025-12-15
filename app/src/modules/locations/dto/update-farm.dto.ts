import { PartialType } from '@nestjs/swagger';
import { CreateFincaDto } from './create-farm.dto';

export class UpdateFincaDto extends PartialType(CreateFincaDto) { }
