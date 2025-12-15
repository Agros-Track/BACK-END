import { PartialType } from '@nestjs/swagger';
import { CreateLoteDto } from './create-lot.dto';

export class UpdateLoteDto extends PartialType(CreateLoteDto) { }
