import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alimentacion } from './entities/alimentacion.entity';
import { CreateFeedingDto } from './dto/create-feeding.dto';
import { AnimalsService } from '../animals/animals.service';
import { LocationsService } from '../locations/locations.service';

@Injectable()
export class FeedingService {
    constructor(
        @InjectRepository(Alimentacion)
        private readonly feedingRepository: Repository<Alimentacion>,
        private readonly animalsService: AnimalsService,
        private readonly locationsService: LocationsService,
    ) { }

    async create(createFeedingDto: CreateFeedingDto, tenantId: number, userId: number) {
        const { aplicaA, animalId, loteId } = createFeedingDto;

        // Validate logic
        if (aplicaA === 'animal') {
            if (!animalId) throw new BadRequestException('animalId is required when applies to animal');
            await this.animalsService.findOne(animalId, tenantId);
        } else if (aplicaA === 'lote') {
            if (!loteId) throw new BadRequestException('loteId is required when applies to lote');
            await this.locationsService.findOneLote(loteId, tenantId);
        }

        const feeding = this.feedingRepository.create({
            ...createFeedingDto,
            tenantId,
            usuarioId: userId,
        });

        return await this.feedingRepository.save(feeding);
    }

    async findAllByLote(loteId: number, tenantId: number) {
        await this.locationsService.findOneLote(loteId, tenantId);
        return await this.feedingRepository.find({
            where: { loteId, tenantId }, // Ensure tenant isolation
            order: { fechaHora: 'DESC' },
        });
    }

    async findAllByAnimal(animalId: number, tenantId: number) {
        await this.animalsService.findOne(animalId, tenantId);
        return await this.feedingRepository.find({
            where: { animalId, tenantId },
            order: { fechaHora: 'DESC' },
        });
    }
}
