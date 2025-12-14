import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Finca } from './entities/finca.entity';
import { Lote } from './entities/lote.entity';
import { CreateFincaDto } from './dto/create-finca.dto';
import { UpdateFincaDto } from './dto/update-finca.dto';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(Finca)
        private readonly fincaRepository: Repository<Finca>,
        @InjectRepository(Lote)
        private readonly loteRepository: Repository<Lote>,
    ) { }

    // --- FINCAS ---

    async createFinca(createFincaDto: CreateFincaDto, tenantId: number) {
        const finca = this.fincaRepository.create({
            ...createFincaDto,
            tenantId,
        });
        return await this.fincaRepository.save(finca);
    }

    async findAllFincas(tenantId: number) {
        return await this.fincaRepository.find({
            where: { tenantId },
            relations: ['lotes'],
        });
    }

    async findOneFinca(id: number, tenantId: number) {
        const finca = await this.fincaRepository.findOne({
            where: { fincaId: id, tenantId },
            relations: ['lotes'],
        });
        if (!finca) throw new NotFoundException(`Finca with ID ${id} not found`);
        return finca;
    }

    async updateFinca(id: number, updateFincaDto: UpdateFincaDto, tenantId: number) {
        const finca = await this.findOneFinca(id, tenantId);
        const updated = Object.assign(finca, updateFincaDto);
        return await this.fincaRepository.save(updated);
    }

    async removeFinca(id: number, tenantId: number) {
        const finca = await this.findOneFinca(id, tenantId);
        return await this.fincaRepository.remove(finca);
    }

    // --- LOTES ---

    async createLote(createLoteDto: CreateLoteDto, tenantId: number) {
        // Verify Finca belongs to Tenant
        await this.findOneFinca(createLoteDto.fincaId, tenantId);

        const lote = this.loteRepository.create(createLoteDto);
        return await this.loteRepository.save(lote);
    }

    async findAllLotes(tenantId: number) {
        return await this.loteRepository.find({
            where: { finca: { tenantId } },
            relations: ['finca'],
        });
    }

    async findOneLote(id: number, tenantId: number) {
        const lote = await this.loteRepository.findOne({
            where: { loteId: id, finca: { tenantId } },
            relations: ['finca'],
        });
        if (!lote) throw new NotFoundException(`Lote with ID ${id} not found`);
        return lote;
    }

    async updateLote(id: number, updateLoteDto: UpdateLoteDto, tenantId: number) {
        const lote = await this.findOneLote(id, tenantId);
        // If changing fincaId, verify new finca
        if (updateLoteDto.fincaId) {
            await this.findOneFinca(updateLoteDto.fincaId, tenantId);
        }
        const updated = Object.assign(lote, updateLoteDto);
        return await this.loteRepository.save(updated);
    }

    async removeLote(id: number, tenantId: number) {
        const lote = await this.findOneLote(id, tenantId);
        return await this.loteRepository.remove(lote);
    }
}
