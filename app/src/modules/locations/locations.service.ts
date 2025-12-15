import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farm } from './entities/farm.entity';
import { Lot } from './entities/lot.entity';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(Farm)
        private readonly farmRepository: Repository<Farm>,
        @InjectRepository(Lot)
        private readonly lotRepository: Repository<Lot>,
    ) { }

    // --- FARMS ---

    async createFarm(createFarmDto: CreateFarmDto, tenantId: number) {
        const farm = this.farmRepository.create({
            ...createFarmDto,
            tenantId,
        });
        return await this.farmRepository.save(farm);
    }

    async findAllFarms(tenantId: number) {
        return await this.farmRepository.find({
            where: { tenantId },
            relations: ['lots'],
        });
    }

    async findOneFarm(id: number, tenantId: number) {
        const farm = await this.farmRepository.findOne({
            where: { farmId: id, tenantId },
            relations: ['lots'],
        });
        if (!farm) throw new NotFoundException(`Farm with ID ${id} not found`);
        return farm;
    }

    async updateFarm(id: number, updateFarmDto: UpdateFarmDto, tenantId: number) {
        const farm = await this.findOneFarm(id, tenantId);
        const updated = Object.assign(farm, updateFarmDto);
        return await this.farmRepository.save(updated);
    }

    async removeFarm(id: number, tenantId: number) {
        const farm = await this.findOneFarm(id, tenantId);
        return await this.farmRepository.remove(farm);
    }

    // --- LOTS ---

    async createLot(createLotDto: CreateLotDto, tenantId: number) {
        // Verify Farm belongs to Tenant
        await this.findOneFarm(createLotDto.farmId, tenantId);

        const lot = this.lotRepository.create(createLotDto);
        return await this.lotRepository.save(lot);
    }

    async findAllLots(tenantId: number) {
        return await this.lotRepository.find({
            where: { farm: { tenantId } },
            relations: ['farm'],
        });
    }

    async findOneLot(id: number, tenantId: number) {
        const lot = await this.lotRepository.findOne({
            where: { lotId: id, farm: { tenantId } },
            relations: ['farm'],
        });
        if (!lot) throw new NotFoundException(`Lot with ID ${id} not found`);
        return lot;
    }

    async updateLot(id: number, updateLotDto: UpdateLotDto, tenantId: number) {
        const lot = await this.findOneLot(id, tenantId);
        // If changing farmId, verify new farm
        if (updateLotDto.farmId) {
            await this.findOneFarm(updateLotDto.farmId, tenantId);
        }
        const updated = Object.assign(lot, updateLotDto);
        return await this.lotRepository.save(updated);
    }

    async removeLot(id: number, tenantId: number) {
        const lot = await this.findOneLot(id, tenantId);
        return await this.lotRepository.remove(lot);
    }
}
