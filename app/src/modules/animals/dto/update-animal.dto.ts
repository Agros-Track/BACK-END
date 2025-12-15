<<<<<<< HEAD
import { PartialType } from "@nestjs/mapped-types";
import { CreateAnimalDto } from './create-animal.dto';

export class UpdateAnimalDto extends PartialType(CreateAnimalDto) {}
=======
import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimalDto } from './create-animal.dto';

export class UpdateAnimalDto extends PartialType(CreateAnimalDto) { }
>>>>>>> feature/modules
