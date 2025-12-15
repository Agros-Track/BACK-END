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
                feedingId: 1,
                appliesTo: 'lot',
                lotId: 5,
                feedType: 'Concentrado',
                quantity: 50,
                unit: 'kg',
                tenantId: 1
            }
        }
    })
    @ApiResponse({ status: 400, description: 'Bad Request (missing required IDs or invalid scope).' })
    create(@Body() createFeedingDto: CreateFeedingDto, @Req() req: any) {
        return this.feedingService.create(createFeedingDto, this.getTenantId(req), this.getUserId(req));
    }

    @Get('lot/:lotId')
    @ApiOperation({ summary: 'Get feeding records for a lote' })
    @ApiResponse({
        status: 200,
        description: 'Return feeding records for the lote.',
        schema: {
            example: [
                {
                    feedingId: 1,
                    appliesTo: 'lot',
                    lotId: 5,
                    feedType: 'Concentrado',
                    quantity: 50,
                    unit: 'kg'
                }
            ]
        }
    })
    @ApiResponse({ status: 404, description: 'Lote not found.' })
    findByLot(@Param('lotId') lotId: string, @Req() req: any) {
        return this.feedingService.findAllByLot(+lotId, this.getTenantId(req));
    }

    @Get('animal/:animalId')
    @ApiOperation({ summary: 'Get feeding records for an animal' })
    @ApiResponse({
        status: 200,
        description: 'Return feeding records for the animal.',
        schema: {
            example: [
                {
                    feedingId: 2,
                    appliesTo: 'animal',
                    animalId: 10,
                    feedType: 'Vitaminas',
                    quantity: 10,
                    unit: 'ml'
                }
            ]
        }
    })
    @ApiResponse({ status: 404, description: 'Animal not found.' })
    findByAnimal(@Param('animalId') animalId: string, @Req() req: any) {
        return this.feedingService.findAllByAnimal(+animalId, this.getTenantId(req));
    }
}
