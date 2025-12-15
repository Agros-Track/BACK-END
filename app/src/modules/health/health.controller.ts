import { Controller, Post, Body, Get, Param, Req, UseGuards } from '@nestjs/common';
import { HealthService } from './health.service';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Health')
@ApiSecurity('JWT-auth', ['JWT-auth'])
@ApiSecurity('tenant-id', ['tenant-id'])
@UseGuards(JwtAuthGuard, RolesGuard)
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
    @Roles('ADMIN_TENANT', 'VETERINARIO')
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
                    type: 'Aftosa',
                    applicationDate: '2023-11-01',
                    nextDate: '2024-05-01',
                    note: 'Routine vaccination',
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
    @Roles('ADMIN_TENANT', 'VETERINARIO')
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
                    symptoms: 'Fever, loss of appetite',
                    diagnosis: 'Flu',
                    severity: 'Moderate',
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
    @Roles('ADMIN_TENANT', 'VETERINARIO')
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
                    medication: 'Antibiotic X',
                    dosage: '5ml',
                    durationDays: 5,
                    startDate: '2023-11-01',
                    status: 'in_progress',
                    tenantId: 1
                }
            ]
        }
    })
    getTreatments(@Param('id') id: string, @Req() req: any) {
        return this.healthService.findTreatmentsByAnimal(+id, this.getTenantId(req));
    }
}
