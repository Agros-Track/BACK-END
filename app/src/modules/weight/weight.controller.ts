import { Controller, Get, Post, Body, Param, Delete, Req, Patch } from '@nestjs/common';
import { WeightService } from './weight.service';
import { CreateWeightDto } from './dto/create-weight.dto';
import { UpdateWeightDto } from './dto/update-weight.dto';

@Controller('weight')
export class WeightController {
    constructor(private readonly weightService: WeightService) { }

    private getTenantId(req: any): number {
        return parseInt(req.tenantId);
    }

    @Post()
    create(@Body() createWeightDto: CreateWeightDto, @Req() req: any) {
        return this.weightService.create(createWeightDto, this.getTenantId(req));
    }

    @Get('animal/:animalId')
    findAllByAnimal(@Param('animalId') animalId: string, @Req() req: any) {
        return this.weightService.findAllByAnimal(+animalId, this.getTenantId(req));
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Req() req: any) {
        return this.weightService.findOne(+id, this.getTenantId(req));
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateWeightDto: UpdateWeightDto, @Req() req: any) {
        return this.weightService.update(+id, updateWeightDto, this.getTenantId(req));
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: any) {
        return this.weightService.remove(+id, this.getTenantId(req));
    }
}
