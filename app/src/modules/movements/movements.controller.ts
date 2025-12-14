import { Controller, Post, Body, Get, Param, Req } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { CreateMovementDto } from './dto/create-movement.dto';

@Controller('movements')
export class MovementsController {
    constructor(private readonly movementsService: MovementsService) { }

    private getTenantId(req: any): number {
        return parseInt(req.tenantId);
    }

    // TODO: Extract logic to get userId from Request (JWT Strategy usually puts user object in req.user)
    // For now, assuming req.user.id exists if AuthGuard is active, otherwise might fail or need mockup
    private getUserId(req: any): number {
        // This depends on how AuthGuard populates the user. 
        // Usually req.user = { userId: 1, ... }
        // If not authenticated, this might be null.
        // Assuming for this stage we might just pass a mock or extract from JWT payload.
        return req.user?.userId || null;
    }

    @Post()
    create(@Body() createMovementDto: CreateMovementDto, @Req() req: any) {
        return this.movementsService.create(
            createMovementDto,
            this.getTenantId(req),
            this.getUserId(req)
        );
    }

    @Get('animal/:animalId')
    findAllByAnimal(@Param('animalId') animalId: string, @Req() req: any) {
        return this.movementsService.findAllByAnimal(+animalId, this.getTenantId(req));
    }
}
