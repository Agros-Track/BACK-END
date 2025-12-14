import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateFincaDto } from './dto/create-farm.dto';
import { UpdateFincaDto } from './dto/update-farm.dto';
import { CreateLoteDto } from './dto/create-lot.dto';
import { UpdateLoteDto } from './dto/update-lot.dto';

@Controller('locations')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) { }

    private getTenantId(req: any): number {
        return parseInt(req.tenantId);
    }

    // --- FINCAS ---

    @Post('fincas')
    createFinca(@Body() createFincaDto: CreateFincaDto, @Req() req: any) {
        return this.locationsService.createFinca(createFincaDto, this.getTenantId(req));
    }

    @Get('fincas')
    findAllFincas(@Req() req: any) {
        return this.locationsService.findAllFincas(this.getTenantId(req));
    }

    @Get('fincas/:id')
    findOneFinca(@Param('id') id: string, @Req() req: any) {
        return this.locationsService.findOneFinca(+id, this.getTenantId(req));
    }

    @Patch('fincas/:id')
    updateFinca(@Param('id') id: string, @Body() updateFincaDto: UpdateFincaDto, @Req() req: any) {
        return this.locationsService.updateFinca(+id, updateFincaDto, this.getTenantId(req));
    }

    @Delete('fincas/:id')
    removeFinca(@Param('id') id: string, @Req() req: any) {
        return this.locationsService.removeFinca(+id, this.getTenantId(req));
    }

    // --- LOTES ---

    @Post('lotes')
    createLote(@Body() createLoteDto: CreateLoteDto, @Req() req: any) {
        return this.locationsService.createLote(createLoteDto, this.getTenantId(req));
    }

    @Get('lotes')
    findAllLotes(@Req() req: any) {
        return this.locationsService.findAllLotes(this.getTenantId(req));
    }

    @Get('lotes/:id')
    findOneLote(@Param('id') id: string, @Req() req: any) {
        return this.locationsService.findOneLote(+id, this.getTenantId(req));
    }

    @Patch('lotes/:id')
    updateLote(@Param('id') id: string, @Body() updateLoteDto: UpdateLoteDto, @Req() req: any) {
        return this.locationsService.updateLote(+id, updateLoteDto, this.getTenantId(req));
    }

    @Delete('lotes/:id')
    removeLote(@Param('id') id: string, @Req() req: any) {
        return this.locationsService.removeLote(+id, this.getTenantId(req));
    }
}
