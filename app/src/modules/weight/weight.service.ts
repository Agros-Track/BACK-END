import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Weight } from './entities/weight.entity';
import { CreateWeightDto } from './dto/create-weight.dto';
import { UpdateWeightDto } from './dto/update-weight.dto';
import { AnimalsService } from '../animals/animals.service';

@Injectable()
export class WeightService {
    constructor(
        @InjectRepository(Weight)
        private readonly weightRepository: Repository<Weight>,
        private readonly animalsService: AnimalsService,
    ) { }

    async create(createWeightDto: CreateWeightDto, tenantId: number): Promise<Weight> {
        // Validate animal existence and ownership
        await this.animalsService.findOne(createWeightDto.animalId, tenantId);

        const weight = this.weightRepository.create({
            ...createWeightDto,
            tenantId,
        });
        return this.weightRepository.save(weight);
    }

    async findAllByAnimal(animalId: number, tenantId: number): Promise<Weight[]> {
        // Validate animal
        await this.animalsService.findOne(animalId, tenantId);

        return this.weightRepository.find({
            where: {
                animalId,
                tenantId,
            },
            order: {
                date: 'DESC', // Most recent first
            },
        });
    }

    async findOne(id: number, tenantId: number): Promise<Weight> {
        const weight = await this.weightRepository.findOne({
            where: { weightId: id, tenantId },
        });

        if (!weight) {
            throw new NotFoundException(`Weight record with ID ${id} not found`);
        }

        return weight;
    }

    async update(id: number, updateWeightDto: UpdateWeightDto, tenantId: number): Promise<Weight> {
        const weight = await this.findOne(id, tenantId);

        const updatedWeight = this.weightRepository.merge(weight, updateWeightDto);
        return this.weightRepository.save(updatedWeight);
    }

    async remove(id: number, tenantId: number): Promise<void> {
        const weight = await this.weightRepository.findOne({
            where: { weightId: id, tenantId },
        });

        if (!weight) {
            throw new NotFoundException(`Weight record with ID ${id} not found`);
        }

        await this.weightRepository.remove(weight);
    }
}
