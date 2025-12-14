import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { LocationsService } from '../locations/locations.service';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,
    private readonly locationsService: LocationsService,
  ) { }

  async create(createAnimalDto: CreateAnimalDto, tenantId: number) {
    // 1. Verify Finca belongs to Tenant
    await this.locationsService.findOneFinca(createAnimalDto.fincaId, tenantId);

    // 2. Verify Lote if present
    if (createAnimalDto.loteId) {
      const lote = await this.locationsService.findOneLote(createAnimalDto.loteId, tenantId);
      // Optional: Verify Lote belongs to Finca
      if (lote.fincaId !== createAnimalDto.fincaId) {
        throw new ConflictException('Lote does not belong to the specified Finca');
      }
    }

    // 3. Create Animal
    const animal = this.animalRepository.create({
      ...createAnimalDto,
      tenantId,
    });

    try {
      return await this.animalRepository.save(animal);
    } catch (error) {
      if (error.code === '23505') { // Postgres unique violation code
        throw new ConflictException('Animal with this code already exists');
      }
      throw error;
    }
  }

  async findAll(tenantId: number) {
    return await this.animalRepository.find({
      where: { tenantId },
      relations: ['finca', 'lote'],
    });
  }

  async findOne(id: number, tenantId: number) {
    const animal = await this.animalRepository.findOne({
      where: { animalId: id, tenantId },
      relations: ['finca', 'lote'],
    });
    if (!animal) throw new NotFoundException(`Animal with ID ${id} not found`);
    return animal;
  }

  async update(id: number, updateAnimalDto: UpdateAnimalDto, tenantId: number) {
    const animal = await this.findOne(id, tenantId);

    // Validate new Finca/Lote if provided
    if (updateAnimalDto.fincaId) {
      await this.locationsService.findOneFinca(updateAnimalDto.fincaId, tenantId);
    }
    if (updateAnimalDto.loteId) {
      const lote = await this.locationsService.findOneLote(updateAnimalDto.loteId, tenantId);
      // Check consistency if fincaId is also being updated or use existing
      const targetFincaId = updateAnimalDto.fincaId || animal.fincaId;
      if (lote.fincaId !== targetFincaId) {
        throw new ConflictException('Lote does not belong to the specified Finca');
      }
    }

    const updated = Object.assign(animal, updateAnimalDto);
    return await this.animalRepository.save(updated);
  }

  async remove(id: number, tenantId: number) {
    const animal = await this.findOne(id, tenantId);
    return await this.animalRepository.remove(animal);
  }
}
