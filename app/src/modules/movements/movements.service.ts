import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { LotMovement } from './entities/lot-movement.entity';
import { CreateMovementDto } from './dto/create-movement.dto';
import { AnimalsService } from '../animals/animals.service';
import { LocationsService } from '../locations/locations.service';

@Injectable()
export class MovementsService {
    constructor(
        @InjectRepository(LotMovement)
        private readonly movementRepository: Repository<LotMovement>,
        private readonly animalsService: AnimalsService,
        private readonly locationsService: LocationsService,
        private readonly dataSource: DataSource,
    ) { }

    async create(createMovementDto: CreateMovementDto, tenantId: number, userId: number) {
        const { animalId, destinationLotId, note } = createMovementDto;

        // 1. Verify Animal
        const animal = await this.animalsService.findOne(animalId, tenantId);

        // 2. Verify Destination Lote
        const loteDestino = await this.locationsService.findOneLot(destinationLotId, tenantId);

        // 3. Logic: If animal is already in that lote, no need to move
        if (animal.lotId === destinationLotId) {
            throw new ConflictException('Animal is already in the destination lot');
        }

        // 4. Transactional Operation: Create Movement Log AND Update Animal Location
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Create Log
            const movement = this.movementRepository.create({
                animalId,
                sourceLotId: animal.lotId, // Current lot becomes origin
                destinationLotId,
                userId: userId,
                note,
            });
            await queryRunner.manager.save(movement);

            // Update Animal
            animal.lotId = destinationLotId;
            // We need to use valid update object or save entity
            // Since we are inside transaction, let's use queryRunner manager
            await queryRunner.manager.save(animal);

            await queryRunner.commitTransaction();
            return movement;

        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async findAllByAnimal(animalId: number, tenantId: number) {
        // Verify animal ownership
        await this.animalsService.findOne(animalId, tenantId);

        return await this.movementRepository.find({
            where: { animalId },
            order: { movementDate: 'DESC' },
            relations: ['sourceLot', 'destinationLot', 'user'],
        });
    }
}
