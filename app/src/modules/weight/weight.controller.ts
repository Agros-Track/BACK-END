import { Controller, Get, Post, Body, Param, Delete, Req, Patch } from '@nestjs/common';
import { WeightService } from './weight.service';
import { CreateWeightDto } from './dto/create-weight.dto';
import { UpdateWeightDto } from './dto/update-weight.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';

@ApiTags('Weight')
@ApiHeader({
    name: 'X-Tenant-ID',
    description: 'Tenant ID required for all operations',
    required: true,
})
@Controller('weight')
export class WeightController {
    constructor(private readonly weightService: WeightService) { }

    private getTenantId(req: any): number {
        return parseInt(req.tenantId);
    }

    @Post()
    @ApiOperation({ summary: 'Create a weight record' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        schema: {
            example: {
                weightId: 1,
                date: '2023-10-25',
                weight: 450.5,
                animalId: 1,
                tenantId: 1
            }
        }
    })
    @ApiResponse({ status: 404, description: 'Animal not found.' })
    create(@Body() createWeightDto: CreateWeightDto, @Req() req: any) {
        return this.weightService.create(createWeightDto, this.getTenantId(req));
    }

    @Get('animal/:animalId')
    @ApiOperation({ summary: 'Get all weight records for an animal' })
    @ApiResponse({
        status: 200,
        description: 'Return all weight records for the animal.',
        schema: {
            example: [
                {
                    weightId: 1,
                    date: '2023-10-25',
                    weight: 450.5,
                    animalId: 1
                },
                {
                    weightId: 2,
                    date: '2023-11-25',
                    weight: 460.0,
                    animalId: 1
                }
            ]
        }
    })
    @ApiResponse({ status: 404, description: 'Animal not found.' })
    findAllByAnimal(@Param('animalId') animalId: string, @Req() req: any) {
        return this.weightService.findAllByAnimal(+animalId, this.getTenantId(req));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific weight record' })
    @ApiResponse({
        status: 200,
        description: 'Return the weight record.',
        schema: {
            example: {
                weightId: 1,
                date: '2023-10-25',
                weight: 450.5,
                animalId: 1,
                tenantId: 1,
                userId: 1
            }
        }
    })
    @ApiResponse({ status: 404, description: 'Record not found.' })
    findOne(@Param('id') id: string, @Req() req: any) {
        return this.weightService.findOne(+id, this.getTenantId(req));
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a weight record' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        schema: {
            example: {
                weightId: 1,
                date: '2023-10-25',
                weight: 455.0,
                animalId: 1,
                tenantId: 1
            }
        }
    })
    @ApiResponse({ status: 404, description: 'Record not found.' })
    update(@Param('id') id: string, @Body() updateWeightDto: UpdateWeightDto, @Req() req: any) {
        return this.weightService.update(+id, updateWeightDto, this.getTenantId(req));
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a weight record' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully deleted.',
        schema: {
            example: {
                message: 'Weight record deleted successfully'
            }
        }
    })
    @ApiResponse({ status: 404, description: 'Record not found.' })
    remove(@Param('id') id: string, @Req() req: any) {
        return this.weightService.remove(+id, this.getTenantId(req));
    }
}
