import { Controller, Post, Body, Get, Param, Req } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { CreateMovementDto } from './dto/create-movement.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';

@ApiTags('Movements')
@ApiHeader({
    name: 'X-Tenant-ID',
    description: 'Tenant ID required for all operations',
    required: true,
})
@Controller('movements')
export class MovementsController {
    constructor(private readonly movementsService: MovementsService) { }

    private getTenantId(req: any): number {
        return parseInt(req.tenantId);
    }

    private getUserId(req: any): number {
        return req.user?.userId || null;
    }

    @Post()
    @ApiOperation({ summary: 'Register an animal movement' })
    @ApiResponse({ status: 201, description: 'Movement recorded successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request (e.g. invalid IDs).' })
    create(@Body() createMovementDto: CreateMovementDto, @Req() req: any) {
        return this.movementsService.create(
            createMovementDto,
            this.getTenantId(req),
            this.getUserId(req)
        );
    }

    @Get('animal/:animalId')
    @ApiOperation({ summary: 'Get movement history for an animal' })
    @ApiResponse({
        status: 200,
        description: 'Return movement history for the animal.',
        schema: {
            example: [
                {
                    movementId: 1,
                    animalId: 1,
                    loteOrigenId: 5,
                    loteDestinoId: 10,
                    nota: 'Rotación de pastos',
                    fecha: '2023-10-25T10:00:00Z',
                    tenantId: 1
                }
            ]
        }
    })
    findAllByAnimal(@Param('animalId') animalId: string, @Req() req: any) {
        return this.movementsService.findAllByAnimal(+animalId, this.getTenantId(req));
    }
}
