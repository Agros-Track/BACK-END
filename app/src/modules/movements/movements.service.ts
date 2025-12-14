import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { MovimientoLote } from './entities/movimiento-lote.entity';
import { CreateMovementDto } from './dto/create-movement.dto';
import { AnimalsService } from '../animals/animals.service';
import { LocationsService } from '../locations/locations.service';

@Injectable()
export class MovementsService {
    constructor(
        @InjectRepository(MovimientoLote)
        private readonly movementRepository: Repository<MovimientoLote>,
        private readonly animalsService: AnimalsService,
        private readonly locationsService: LocationsService,
        private readonly dataSource: DataSource,
    ) { }

    async create(createMovementDto: CreateMovementDto, tenantId: number, userId: number) {
        const { animalId, loteDestinoId, nota } = createMovementDto;

        // 1. Verify Animal
        const animal = await this.animalsService.findOne(animalId, tenantId);

        // 2. Verify Destination Lote
        const loteDestino = await this.locationsService.findOneLote(loteDestinoId, tenantId);

        // 3. Logic: If animal is already in that lote, no need to move
        if (animal.loteId === loteDestinoId) {
            throw new ConflictException('Animal is already in the destination lote');
        }

        // 4. Transactional Operation: Create Movement Log AND Update Animal Location
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Create Log
            const movement = this.movementRepository.create({
                animalId,
                loteOrigenId: animal.loteId, // Current lote becomes origin
                loteDestinoId,
                usuarioId: userId,
                nota,
            });
            await queryRunner.manager.save(movement);

            // Update Animal
            animal.loteId = loteDestinoId;
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
            order: { fechaMovimiento: 'DESC' },
            relations: ['loteOrigen', 'loteDestino', 'usuario'],
        });
    }
}
