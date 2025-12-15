import { Controller, Post, Body, Get, Param, Req, UseGuards } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { CreateMovementDto } from './dto/create-movement.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Movements')
@ApiSecurity('JWT-auth', ['JWT-auth'])
@ApiSecurity('tenant-id', ['tenant-id'])
@UseGuards(JwtAuthGuard, RolesGuard)
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
    @Roles('ADMIN_TENANT','TRABAJADOR')
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
    @Roles('ADMIN_TENANT','TRABAJADOR')
    @ApiOperation({ summary: 'Get movement history for an animal' })
    @ApiResponse({
        status: 200,
        description: 'Return movement history for the animal.',
        schema: {
            example: [
                {
                    movementId: 1,
                    animalId: 1,
                    sourceLotId: 5,
                    destinationLotId: 10,
                    note: 'Rotación de pastos',
                    movementDate: '2023-10-25T10:00:00Z',
                    tenantId: 1
                }
            ]
        }
    })
    findAllByAnimal(@Param('animalId') animalId: string, @Req() req: any) {
        return this.movementsService.findAllByAnimal(+animalId, this.getTenantId(req));
    }
}
