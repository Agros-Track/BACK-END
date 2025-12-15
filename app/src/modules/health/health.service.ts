import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vaccine } from './entities/vaccine.entity';
import { Disease } from './entities/disease.entity';
import { Treatment } from './entities/treatment.entity';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { AnimalsService } from '../animals/animals.service';
import { LocationsService } from '../locations/locations.service';

@Injectable()
export class HealthService {
    constructor(
        @InjectRepository(Vaccine)
        private readonly vaccineRepository: Repository<Vaccine>,
        @InjectRepository(Disease)
        private readonly diseaseRepository: Repository<Disease>,
        @InjectRepository(Treatment)
        private readonly treatmentRepository: Repository<Treatment>,
        private readonly animalsService: AnimalsService,
        private readonly locationsService: LocationsService,
    ) { }

    // --- VACCINES ---

    async findVaccinesByAnimal(animalId: number, tenantId: number) {
        await this.animalsService.findOne(animalId, tenantId);
        return await this.vaccineRepository.find({
            where: { animalId },
            order: { applicationDate: 'DESC' },
        });
    }

    async createVaccine(dto: CreateVaccineDto, tenantId: number, userId: number) {
        if (dto.animalId) {
            await this.animalsService.findOne(dto.animalId, tenantId);
        }
        if (dto.lotId) {
            await this.locationsService.findOneLot(dto.lotId, tenantId);
        }
        if (!dto.animalId && !dto.lotId) {
            throw new BadRequestException('Must provide either animalId or lotId');
        }

        const vaccine = this.vaccineRepository.create({
            ...dto,
            tenantId,
            userId: userId,
        });
        return await this.vaccineRepository.save(vaccine);
    }

    // --- DISEASES ---

    async findDiseasesByAnimal(animalId: number, tenantId: number) {
        await this.animalsService.findOne(animalId, tenantId);
        return await this.diseaseRepository.find({
            where: { animalId },
            order: { registrationDate: 'DESC' },
        });
    }

    async createDisease(dto: CreateDiseaseDto, tenantId: number, userId: number) {
        await this.animalsService.findOne(dto.animalId, tenantId);
        const disease = this.diseaseRepository.create({
            ...dto,
            tenantId,
            userId: userId,
        });
        return await this.diseaseRepository.save(disease);
    }

    // --- TREATMENTS ---

    async findTreatmentsByAnimal(animalId: number, tenantId: number) {
        await this.animalsService.findOne(animalId, tenantId);
        return await this.treatmentRepository.find({
            where: { animalId },
            relations: ['disease'],
            order: { startDate: 'DESC' },
        });
    }

    async createTreatment(dto: CreateTreatmentDto, tenantId: number, userId: number) {
        await this.animalsService.findOne(dto.animalId, tenantId);

        // Create treatment
        const treatment = this.treatmentRepository.create({
            ...dto,
            tenantId,
            userId: userId,
        });
        return await this.treatmentRepository.save(treatment);
    }
}
