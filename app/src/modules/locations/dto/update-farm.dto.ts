import { PartialType } from '@nestjs/mapped-types';
import { CreateFincaDto } from './create-farm.dto';

export class UpdateFincaDto extends PartialType(CreateFincaDto) { }
