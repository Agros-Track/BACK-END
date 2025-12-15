import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateFincaDto } from './dto/create-farm.dto';
import { UpdateFincaDto } from './dto/update-farm.dto';
import { CreateLoteDto } from './dto/create-lot.dto';
import { UpdateLoteDto } from './dto/update-lot.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';

@ApiTags('Locations')
@ApiHeader({
    name: 'X-Tenant-ID',
    description: 'Tenant ID required for all operations',
    required: true,
})
@Controller('locations')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) { }

    private getTenantId(req: any): number {
        return parseInt(req.tenantId);
    }

    // --- FINCAS ---

    @Post('fincas')
    @ApiOperation({ summary: 'Create a farm (finca)' })
    @ApiResponse({
        status: 201,
        description: 'The farm has been successfully created.',
        schema: {
            example: {
                id: 1,
                nombre: 'Hacienda La Gloria',
                descripcion: 'Main Dairy Farm'
            }
        }
    })
    createFinca(@Body() createFincaDto: CreateFincaDto, @Req() req: any) {
        return this.locationsService.createFinca(createFincaDto, this.getTenantId(req));
    }

    @Get('fincas')
    @ApiOperation({ summary: 'Get all farms' })
    @ApiResponse({
        status: 200,
        description: 'Return all farms.',
        schema: {
            example: [
                {
                    id: 1,
                    nombre: 'Hacienda La Gloria'
                }
            ]
        }
    })
    findAllFincas(@Req() req: any) {
        return this.locationsService.findAllFincas(this.getTenantId(req));
    }

    @Get('fincas/:id')
    @ApiOperation({ summary: 'Get a specific farm' })
    @ApiResponse({
        status: 200,
        description: 'Return the farm.',
        schema: {
            example: {
                fincaId: 1,
                nombre: 'Hacienda La Gloria',
                descripcion: 'Main Dairy Farm',
                tenantId: 1,
                creadoEn: '2023-01-01T00:00:00Z',
                actualizadoEn: '2023-01-01T00:00:00Z'
            }
        }
    })
    @ApiResponse({ status: 404, description: 'Farm not found.' })
    findOneFinca(@Param('id') id: string, @Req() req: any) {
        return this.locationsService.findOneFinca(+id, this.getTenantId(req));
    }

    @Patch('fincas/:id')
    @ApiOperation({ summary: 'Update a farm' })
    @ApiResponse({
        status: 200,
        description: 'The farm has been successfully updated.',
        schema: {
            example: {
                fincaId: 1,
                nombre: 'Hacienda La Gloria Updated',
                descripcion: 'Updated description',
                tenantId: 1
            }
        }
    })
    @ApiResponse({ status: 404, description: 'Farm not found.' })
    updateFinca(@Param('id') id: string, @Body() updateFincaDto: UpdateFincaDto, @Req() req: any) {
        return this.locationsService.updateFinca(+id, updateFincaDto, this.getTenantId(req));
    }

    @Delete('fincas/:id')
    @ApiOperation({ summary: 'Delete a farm' })
    @ApiResponse({ status: 200, description: 'The farm has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Farm not found.' })
    removeFinca(@Param('id') id: string, @Req() req: any) {
        return this.locationsService.removeFinca(+id, this.getTenantId(req));
    }

    // --- LOTES ---

    @Post('lotes')
    @ApiOperation({ summary: 'Create a lot (lote)' })
    @ApiResponse({
        status: 201,
        description: 'The lot has been successfully created.',
        schema: {
            example: {
                id: 5,
                nombre: 'Lote 1',
                fincaId: 1,
                tipo: 'Pasto'
            }
        }
    })
    @ApiResponse({ status: 404, description: 'Farm not found.' })
    createLote(@Body() createLoteDto: CreateLoteDto, @Req() req: any) {
        return this.locationsService.createLote(createLoteDto, this.getTenantId(req));
    }

    @Get('lotes')
    @ApiOperation({ summary: 'Get all lots' })
    @ApiResponse({
        status: 200,
        description: 'Return all lots.',
        schema: {
            example: [
                {
                    loteId: 5,
                    nombre: 'Lote 1',
                    fincaId: 1,
                    tipo: 'Pasto'
                }
            ]
        }
    })
    findAllLotes(@Req() req: any) {
        return this.locationsService.findAllLotes(this.getTenantId(req));
    }

    @Get('lotes/:id')
    @ApiOperation({ summary: 'Get a specific lot' })
    @ApiResponse({
        status: 200,
        description: 'Return the lot.',
        schema: {
            example: {
                loteId: 5,
                nombre: 'Lote 1',
                fincaId: 1,
                tipo: 'Pasto',
                descripcion: 'Northern pasture',
                tenantId: 1
            }
        }
    })
    @ApiResponse({ status: 404, description: 'Lot not found.' })
    findOneLote(@Param('id') id: string, @Req() req: any) {
        return this.locationsService.findOneLote(+id, this.getTenantId(req));
    }

    @Patch('lotes/:id')
    @ApiOperation({ summary: 'Update a lot' })
    @ApiResponse({
        status: 200,
        description: 'The lot has been successfully updated.',
        schema: {
            example: {
                loteId: 5,
                nombre: 'Lote 1 Updated',
                estado: 'inactivo'
            }
        }
    })
    @ApiResponse({ status: 404, description: 'Lot not found.' })
    updateLote(@Param('id') id: string, @Body() updateLoteDto: UpdateLoteDto, @Req() req: any) {
        return this.locationsService.updateLote(+id, updateLoteDto, this.getTenantId(req));
    }

    @Delete('lotes/:id')
    @ApiOperation({ summary: 'Delete a lot' })
    @ApiResponse({
        status: 200,
        description: 'The lot has been successfully deleted.',
        schema: {
            example: {
                message: 'Lot deleted successfully'
            }
        }
    })
    @ApiResponse({ status: 404, description: 'Lot not found.' })
    removeLote(@Param('id') id: string, @Req() req: any) {
        return this.locationsService.removeLote(+id, this.getTenantId(req));
    }
}
