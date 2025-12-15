import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { Production } from './entities/production.entity';
import { AnimalsService } from '../animals/animals.service';
import { LocationsService } from '../locations/locations.service';

@Injectable()
export class ProductionsService {
  constructor(
    @InjectRepository(Production)
    private readonly productionRepository: Repository<Production>,
    private readonly animalsService: AnimalsService,
    private readonly locationsService: LocationsService,
  ) { }

  async create(createProductionDto: CreateProductionDto, tenantId: number): Promise<Production> {
    if (createProductionDto.animalId) {
      // Validate animal existence
      await this.animalsService.findOne(createProductionDto.animalId, tenantId);
    }

    if (createProductionDto.lotId) {
      await this.locationsService.findOneLot(createProductionDto.lotId, tenantId);
    }

    const production = this.productionRepository.create({
      ...createProductionDto,
      tenantId,
    });
    return this.productionRepository.save(production);
  }

  async findAll(tenantId: number): Promise<Production[]> {
    return this.productionRepository.find({
      where: { tenantId },
      order: { date: 'DESC' },
      relations: ['animal', 'lot'],
    });
  }

  async findOne(id: number, tenantId: number): Promise<Production> {
    const production = await this.productionRepository.findOne({
      where: { productionId: id, tenantId },
      relations: ['animal', 'lot'],
    });

    if (!production) {
      throw new NotFoundException(`Production record with ID ${id} not found`);
    }
    return production;
  }

  async update(id: number, updateProductionDto: UpdateProductionDto, tenantId: number): Promise<Production> {
    const production = await this.findOne(id, tenantId);
    const updated = this.productionRepository.merge(production, updateProductionDto);
    return this.productionRepository.save(updated);
  }

  async remove(id: number, tenantId: number): Promise<void> {
    const production = await this.findOne(id, tenantId);
    await this.productionRepository.remove(production);
  }
}
