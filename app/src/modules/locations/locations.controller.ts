import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Locations')
@ApiSecurity('JWT-auth', ['JWT-auth'])
@ApiSecurity('tenant-id', ['tenant-id'])
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('locations')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) { }

    private getTenantId(req: any): number {
        return parseInt(req.tenantId);
    }

    // --- FARMS ---

    @Post('farms')
    @Roles('ADMIN_TENANT')
    @ApiOperation({ summary: 'Create a farm' })
    @ApiResponse({
        status: 201,
        description: 'The farm has been successfully created.',
        schema: {
            example: {
                farmId: 1,
                name: 'Hacienda La Gloria',
                description: 'Main Dairy Farm'
            }
        }
    })
    createFarm(@Body() createFarmDto: CreateFarmDto, @Req() req: any) {
        return this.locationsService.createFarm(createFarmDto, this.getTenantId(req));
    }

    @Get('farms')
    @Roles('ADMIN_TENANT')
    @ApiOperation({ summary: 'Get all farms' })
    @ApiResponse({
        status: 200,
        description: 'Return all farms.',
        schema: {
            example: [
                {
                    farmId: 1,
                    name: 'Hacienda La Gloria'
                }
            ]
        }
    })
    findAllFarms(@Req() req: any) {
        return this.locationsService.findAllFarms(this.getTenantId(req));
    }

    @Get('farms/:id')
    @Roles('ADMIN_TENANT')
    @ApiOperation({ summary: 'Get a specific farm' })
    @ApiResponse({
        status: 200,
        description: 'Return the farm.',
        schema: {
            example: {
                farmId: 1,
                name: 'Hacienda La Gloria',
                description: 'Main Dairy Farm',
                tenantId: 1,
                createdAt: '2023-01-01T00:00:00Z',
                updatedAt: '2023-01-01T00:00:00Z'
            }
        }
    })
    @ApiResponse({ status: 404, description: 'Farm not found.' })
    findOneFarm(@Param('id') id: string, @Req() req: any) {
        return this.locationsService.findOneFarm(+id, this.getTenantId(req));
    }

    @Patch('farms/:id')
    @Roles('ADMIN_TENANT')
    @ApiOperation({ summary: 'Update a farm' })
    @ApiResponse({
        status: 200,
        description: 'The farm has been successfully updated.',
        schema: {
            example: {
                farmId: 1,
                name: 'Hacienda La Gloria Updated',
                description: 'Updated description',
                tenantId: 1
            }
        }
    })
    @ApiResponse({ status: 404, description: 'Farm not found.' })
    updateFarm(@Param('id') id: string, @Body() updateFarmDto: UpdateFarmDto, @Req() req: any) {
        return this.locationsService.updateFarm(+id, updateFarmDto, this.getTenantId(req));
    }

    @Delete('farms/:id')
    @Roles('ADMIN_TENANT')
    @ApiOperation({ summary: 'Delete a farm' })
    @ApiResponse({ status: 200, description: 'The farm has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Farm not found.' })
    removeFarm(@Param('id') id: string, @Req() req: any) {
        return this.locationsService.removeFarm(+id, this.getTenantId(req));
    }

    // --- LOTS ---

    @Post('lots')
    @Roles('ADMIN_TENANT')
    @ApiOperation({ summary: 'Create a lot' })
    @ApiResponse({
        status: 201,
        description: 'The lot has been successfully created.',
        schema: {
            example: {
                lotId: 5,
                name: 'Lote 1',
                farmId: 1,
                type: 'Pasto'
            }
        }
    })
    @ApiResponse({ status: 404, description: 'Farm not found.' })
    createLot(@Body() createLotDto: CreateLotDto, @Req() req: any) {
        return this.locationsService.createLot(createLotDto, this.getTenantId(req));
    }

    @Get('lots')
    @Roles('ADMIN_TENANT','TRABAJADOR')
    @ApiOperation({ summary: 'Get all lots' })
    @ApiResponse({
        status: 200,
        description: 'Return all lots.',
        schema: {
            example: [
                {
                    lotId: 5,
                    name: 'Lote 1',
                    farmId: 1,
                    type: 'Pasto'
                }
            ]
        }
    })
    findAllLots(@Req() req: any) {
        return this.locationsService.findAllLots(this.getTenantId(req));
    }

    @Get('lots/:id')
    @Roles('ADMIN_TENANT','TRABAJADOR')
    @ApiOperation({ summary: 'Get a specific lot' })
    @ApiResponse({
        status: 200,
        description: 'Return the lot.',
        schema: {
            example: {
                lotId: 5,
                name: 'Lote 1',
                farmId: 1,
                type: 'Pasto',
                description: 'Northern pasture',
                tenantId: 1
            }
        }
    })
    @ApiResponse({ status: 404, description: 'Lot not found.' })
    findOneLot(@Param('id') id: string, @Req() req: any) {
        return this.locationsService.findOneLot(+id, this.getTenantId(req));
    }

    @Patch('lots/:id')
    @Roles('ADMIN_TENANT')
    @ApiOperation({ summary: 'Update a lot' })
    @ApiResponse({
        status: 200,
        description: 'The lot has been successfully updated.',
        schema: {
            example: {
                lotId: 5,
                name: 'Lote 1 Updated',
                status: 'inactive'
            }
        }
    })
    @ApiResponse({ status: 404, description: 'Lot not found.' })
    updateLot(@Param('id') id: string, @Body() updateLotDto: UpdateLotDto, @Req() req: any) {
        return this.locationsService.updateLot(+id, updateLotDto, this.getTenantId(req));
    }

    @Delete('lots/:id')
    @Roles('ADMIN_TENANT')
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
    removeLot(@Param('id') id: string, @Req() req: any) {
        return this.locationsService.removeLot(+id, this.getTenantId(req));
    }
}
