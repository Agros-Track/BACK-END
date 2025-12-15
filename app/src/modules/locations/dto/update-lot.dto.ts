import { PartialType } from '@nestjs/mapped-types';
import { CreateLoteDto } from './create-lot.dto';

export class UpdateLoteDto extends PartialType(CreateLoteDto) { }
