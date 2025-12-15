import { Controller, Post, Body, Get, Param, Req } from '@nestjs/common';
import { FeedingService } from './feeding.service';
import { CreateFeedingDto } from './dto/create-feeding.dto';

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
    create(@Body() createFeedingDto: CreateFeedingDto, @Req() req: any) {
        return this.feedingService.create(createFeedingDto, this.getTenantId(req), this.getUserId(req));
    }

    @Get('lote/:loteId')
    findByLote(@Param('loteId') loteId: string, @Req() req: any) {
        return this.feedingService.findAllByLote(+loteId, this.getTenantId(req));
    }

    @Get('animal/:animalId')
    findByAnimal(@Param('animalId') animalId: string, @Req() req: any) {
        return this.feedingService.findAllByAnimal(+animalId, this.getTenantId(req));
    }
}
