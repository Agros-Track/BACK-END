import { Controller, Post, Body, Get, Param, Req } from '@nestjs/common';
import { HealthService } from './health.service';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { CreateTreatmentDto } from './dto/create-treatment.dto';

@Controller('health')
export class HealthController {
    constructor(private readonly healthService: HealthService) { }

    private getTenantId(req: any): number {
        return parseInt(req.tenantId);
    }

    private getUserId(req: any): number {
        return req.user?.userId || null;
    }

    // --- VACCINES ---

    @Post('vaccines')
    createVaccine(@Body() dto: CreateVaccineDto, @Req() req: any) {
        return this.healthService.createVaccine(dto, this.getTenantId(req), this.getUserId(req));
    }

    @Get('vaccines/animal/:id')
    getVaccines(@Param('id') id: string, @Req() req: any) {
        return this.healthService.findVaccinesByAnimal(+id, this.getTenantId(req));
    }

    // --- DISEASES ---

    @Post('diseases')
    createDisease(@Body() dto: CreateDiseaseDto, @Req() req: any) {
        return this.healthService.createDisease(dto, this.getTenantId(req), this.getUserId(req));
    }

    @Get('diseases/animal/:id')
    getDiseases(@Param('id') id: string, @Req() req: any) {
        return this.healthService.findDiseasesByAnimal(+id, this.getTenantId(req));
    }

    // --- TREATMENTS ---

    @Post('treatments')
    createTreatment(@Body() dto: CreateTreatmentDto, @Req() req: any) {
        return this.healthService.createTreatment(dto, this.getTenantId(req), this.getUserId(req));
    }

    @Get('treatments/animal/:id')
    getTreatments(@Param('id') id: string, @Req() req: any) {
        return this.healthService.findTreatmentsByAnimal(+id, this.getTenantId(req));
    }
}
