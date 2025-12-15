import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './entities/animals.entity';
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
    // 1. Verify Farm belongs to Tenant
    await this.locationsService.findOneFarm(createAnimalDto.farmId, tenantId);

    // 2. Verify Lote if present
    if (createAnimalDto.lotId) {
      const lote = await this.locationsService.findOneLot(createAnimalDto.lotId, tenantId);
      // Optional: Verify Lot belongs to Farm
      if (lote.farmId !== createAnimalDto.farmId) {
        throw new ConflictException('Lot does not belong to the specified Farm');
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
      relations: ['farm', 'lot'],
    });
  }

  async findOne(id: number, tenantId: number) {
    const animal = await this.animalRepository.findOne({
      where: { animalId: id, tenantId },
      relations: ['farm', 'lot'],
    });
    if (!animal) throw new NotFoundException(`Animal with ID ${id} not found`);
    return animal;
  }

  async update(id: number, updateAnimalDto: UpdateAnimalDto, tenantId: number) {
    const animal = await this.findOne(id, tenantId);

    // Validate new Farm/Lot if provided
    if (updateAnimalDto.farmId) {
      await this.locationsService.findOneFarm(updateAnimalDto.farmId, tenantId);
    }
    if (updateAnimalDto.lotId) {
      const lote = await this.locationsService.findOneLot(updateAnimalDto.lotId, tenantId);
      // Check consistency if farmId is also being updated or use existing
      const targetFarmId = updateAnimalDto.farmId || animal.farmId;
      if (lote.farmId !== targetFarmId) {
        throw new ConflictException('Lot does not belong to the specified Farm');
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
