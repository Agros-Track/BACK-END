import { Controller, Post, Body, Get, Param, Req } from '@nestjs/common';
import { HealthService } from './health.service';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';

@ApiTags('Health')
@ApiHeader({
    name: 'X-Tenant-ID',
    description: 'Tenant ID required for all operations',
    required: true,
})
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
    @ApiOperation({ summary: 'Record a vaccination' })
    @ApiResponse({ status: 201, description: 'Vaccine recorded successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    createVaccine(@Body() dto: CreateVaccineDto, @Req() req: any) {
        return this.healthService.createVaccine(dto, this.getTenantId(req), this.getUserId(req));
    }

    @Get('vaccines/animal/:id')
    @ApiOperation({ summary: 'Get vaccines for an animal' })
    @ApiResponse({
        status: 200,
        description: 'Return vaccines for the animal.',
        schema: {
            example: [
                {
                    vaccineId: 1,
                    animalId: 1,
                    tipo: 'Aftosa',
                    fechaAplicacion: '2023-11-01',
                    fechaProxima: '2024-05-01',
                    nota: 'Routine vaccination',
                    tenantId: 1
                }
            ]
        }
    })
    getVaccines(@Param('id') id: string, @Req() req: any) {
        return this.healthService.findVaccinesByAnimal(+id, this.getTenantId(req));
    }

    // --- DISEASES ---

    @Post('diseases')
    @ApiOperation({ summary: 'Record a disease/illness' })
    @ApiResponse({ status: 201, description: 'Disease recorded successfully.' })
    createDisease(@Body() dto: CreateDiseaseDto, @Req() req: any) {
        return this.healthService.createDisease(dto, this.getTenantId(req), this.getUserId(req));
    }

    @Get('diseases/animal/:id')
    @ApiOperation({ summary: 'Get diseases for an animal' })
    @ApiResponse({
        status: 200,
        description: 'Return diseases for the animal.',
        schema: {
            example: [
                {
                    diseaseId: 1,
                    animalId: 1,
                    sintomas: 'Fever, loss of appetite',
                    diagnostico: 'Flu',
                    gravedad: 'Moderate',
                    tenantId: 1
                }
            ]
        }
    })
    getDiseases(@Param('id') id: string, @Req() req: any) {
        return this.healthService.findDiseasesByAnimal(+id, this.getTenantId(req));
    }

    // --- TREATMENTS ---

    @Post('treatments')
    @ApiOperation({ summary: 'Record a treatment' })
    @ApiResponse({ status: 201, description: 'Treatment recorded successfully.' })
    createTreatment(@Body() dto: CreateTreatmentDto, @Req() req: any) {
        return this.healthService.createTreatment(dto, this.getTenantId(req), this.getUserId(req));
    }

    @Get('treatments/animal/:id')
    @ApiOperation({ summary: 'Get treatments for an animal' })
    @ApiResponse({
        status: 200,
        description: 'Return treatments for the animal.',
        schema: {
            example: [
                {
                    treatmentId: 1,
                    animalId: 1,
                    medicamento: 'Antibiotic X',
                    dosis: '5ml',
                    duracionDias: 5,
                    fechaInicio: '2023-11-01',
                    estado: 'in_progress',
                    tenantId: 1
                }
            ]
        }
    })
    getTreatments(@Param('id') id: string, @Req() req: any) {
        return this.healthService.findTreatmentsByAnimal(+id, this.getTenantId(req));
    }
}
