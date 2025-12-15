import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacuna } from './entities/vacuna.entity';
import { Enfermedad } from './entities/enfermedad.entity';
import { Tratamiento } from './entities/tratamiento.entity';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { AnimalsService } from '../animals/animals.service';
import { LocationsService } from '../locations/locations.service';

@Injectable()
export class HealthService {
    constructor(
        @InjectRepository(Vacuna)
        private readonly vaccineRepository: Repository<Vacuna>,
        @InjectRepository(Enfermedad)
        private readonly diseaseRepository: Repository<Enfermedad>,
        @InjectRepository(Tratamiento)
        private readonly treatmentRepository: Repository<Tratamiento>,
        private readonly animalsService: AnimalsService,
        private readonly locationsService: LocationsService,
    ) { }

    // --- VACCINES ---

    async findVaccinesByAnimal(animalId: number, tenantId: number) {
        await this.animalsService.findOne(animalId, tenantId);
        return await this.vaccineRepository.find({
            where: { animalId },
            order: { fechaAplicacion: 'DESC' },
        });
    }

    async createVaccine(dto: CreateVaccineDto, tenantId: number, userId: number) {
        if (dto.animalId) {
            await this.animalsService.findOne(dto.animalId, tenantId);
        }
        if (dto.loteId) {
            await this.locationsService.findOneLote(dto.loteId, tenantId);
        }
        if (!dto.animalId && !dto.loteId) {
            throw new BadRequestException('Must provide either animalId or loteId');
        }

        const vaccine = this.vaccineRepository.create({
            ...dto,
            tenantId,
            usuarioId: userId,
        });
        return await this.vaccineRepository.save(vaccine);
    }

    // --- DISEASES ---

    async findDiseasesByAnimal(animalId: number, tenantId: number) {
        await this.animalsService.findOne(animalId, tenantId);
        return await this.diseaseRepository.find({
            where: { animalId },
            order: { fechaRegistro: 'DESC' },
        });
    }

    async createDisease(dto: CreateDiseaseDto, tenantId: number, userId: number) {
        await this.animalsService.findOne(dto.animalId, tenantId);
        const disease = this.diseaseRepository.create({
            ...dto,
            tenantId,
            usuarioId: userId,
        });
        return await this.diseaseRepository.save(disease);
    }

    // --- TREATMENTS ---

    async findTreatmentsByAnimal(animalId: number, tenantId: number) {
        await this.animalsService.findOne(animalId, tenantId);
        return await this.treatmentRepository.find({
            where: { animalId },
            relations: ['enfermedad'],
            order: { fechaInicio: 'DESC' },
        });
    }

    async createTreatment(dto: CreateTreatmentDto, tenantId: number, userId: number) {
        await this.animalsService.findOne(dto.animalId, tenantId);

        // Create treatment
        const treatment = this.treatmentRepository.create({
            ...dto,
            tenantId,
            usuarioId: userId,
        });
        return await this.treatmentRepository.save(treatment);
    }
}
