import { Controller, Post, Body, Get, Param, Req } from '@nestjs/common';
import { FeedingService } from './feeding.service';
import { CreateFeedingDto } from './dto/create-feeding.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';

@ApiTags('Feeding')
@ApiHeader({
    name: 'X-Tenant-ID',
    description: 'Tenant ID required for all operations',
    required: true,
})
@Controller('feeding')
export class FeedingController {
    constructor(private readonly feedingService: FeedingService) { }

    private getTenantId(req: any): number {
        return parseInt(req.tenantId);
    }

    private getUserId(req: any): number {
        return req.user?.userId || null;
    }

    @Post()
    @ApiOperation({ summary: 'Create a feeding record' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        schema: {
            example: {
                id: 1,
                aplicaA: 'lote',
                loteId: 5,
                tipoAlimento: 'Concentrado',
                cantidad: 50,
                unidad: 'kg',
                tenantId: 1
            }
        }
    })
    @ApiResponse({ status: 400, description: 'Bad Request (missing required IDs or invalid scope).' })
    create(@Body() createFeedingDto: CreateFeedingDto, @Req() req: any) {
        return this.feedingService.create(createFeedingDto, this.getTenantId(req), this.getUserId(req));
    }

    @Get('lote/:loteId')
    @ApiOperation({ summary: 'Get feeding records for a lote' })
    @ApiResponse({
        status: 200,
        description: 'Return feeding records for the lote.',
        schema: {
            example: [
                {
                    id: 1,
                    aplicaA: 'lote',
                    loteId: 5,
                    tipoAlimento: 'Concentrado',
                    cantidad: 50,
                    unidad: 'kg'
                }
            ]
        }
    })
    @ApiResponse({ status: 404, description: 'Lote not found.' })
    findByLote(@Param('loteId') loteId: string, @Req() req: any) {
        return this.feedingService.findAllByLote(+loteId, this.getTenantId(req));
    }

    @Get('animal/:animalId')
    @ApiOperation({ summary: 'Get feeding records for an animal' })
    @ApiResponse({
        status: 200,
        description: 'Return feeding records for the animal.',
        schema: {
            example: [
                {
                    id: 2,
                    aplicaA: 'animal',
                    animalId: 10,
                    tipoAlimento: 'Vitaminas',
                    cantidad: 10,
                    unidad: 'ml'
                }
            ]
        }
    })
    @ApiResponse({ status: 404, description: 'Animal not found.' })
    findByAnimal(@Param('animalId') animalId: string, @Req() req: any) {
        return this.feedingService.findAllByAnimal(+animalId, this.getTenantId(req));
    }
}
