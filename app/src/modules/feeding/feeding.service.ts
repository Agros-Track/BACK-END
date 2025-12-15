import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feeding } from './entities/feeding.entity';
import { CreateFeedingDto } from './dto/create-feeding.dto';
import { AnimalsService } from '../animals/animals.service';
import { LocationsService } from '../locations/locations.service';

@Injectable()
export class FeedingService {
    constructor(
        @InjectRepository(Feeding)
        private readonly feedingRepository: Repository<Feeding>,
        private readonly animalsService: AnimalsService,
        private readonly locationsService: LocationsService,
    ) { }

    async create(createFeedingDto: CreateFeedingDto, tenantId: number, userId: number) {
        const { appliesTo, animalId, lotId } = createFeedingDto;

        // Validate logic
        if (appliesTo === 'animal') {
            if (!animalId) throw new BadRequestException('animalId is required when applies to animal');
            await this.animalsService.findOne(animalId, tenantId);
        } else if (appliesTo === 'lot') {
            if (!lotId) throw new BadRequestException('lotId is required when applies to lot');
            await this.locationsService.findOneLot(lotId, tenantId);
        }

        const feeding = this.feedingRepository.create({
            ...createFeedingDto,
            tenantId,
            userId: userId,
        });

        return await this.feedingRepository.save(feeding);
    }

    async findAllByLot(lotId: number, tenantId: number) {
        await this.locationsService.findOneLot(lotId, tenantId);
        return await this.feedingRepository.find({
            where: { lotId, tenantId }, // Ensure tenant isolation
            order: { dateTime: 'DESC' },
        });
    }

    async findAllByAnimal(animalId: number, tenantId: number) {
        await this.animalsService.findOne(animalId, tenantId);
        return await this.feedingRepository.find({
            where: { animalId, tenantId },
            order: { dateTime: 'DESC' },
        });
    }
}
