import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';

@ApiTags('Animals')
@ApiHeader({
  name: 'X-Tenant-ID',
  description: 'Tenant ID required for all operations',
  required: true,
})
@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) { }

  private getTenantId(req: any): number {
    return parseInt(req.tenantId);
  }

  @Post()
  @ApiOperation({ summary: 'Create an animal' })
  @ApiResponse({ status: 201, description: 'The animal has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createAnimalDto: CreateAnimalDto, @Req() req: any) {
    return this.animalsService.create(createAnimalDto, this.getTenantId(req));
  }

  @Get()
  @ApiOperation({ summary: 'Get all animals' })
  @ApiResponse({
    status: 200,
    description: 'Return all animals.',
    schema: {
      example: [
        {
          animalId: 1,
          code: 'CO-12345',
          type: 'cow',
          breed: 'Holstein',
          sex: 'F',
          status: 'active',
          farmId: 1,
          lotId: 5
        }
      ]
    }
  })
  findAll(@Req() req: any) {
    return this.animalsService.findAll(this.getTenantId(req));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific animal' })
  @ApiResponse({
    status: 200,
    description: 'Return the animal.',
    schema: {
      example: {
        animalId: 1,
        code: 'CO-12345',
        type: 'cow',
        breed: 'Holstein',
        sex: 'F',
        birthDate: '2020-01-01',
        status: 'active',
        farmId: 1,
        lotId: 5,
        tenantId: 1
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Animal not found.' })
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.animalsService.findOne(+id, this.getTenantId(req));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an animal' })
  @ApiResponse({
    status: 200,
    description: 'The animal has been successfully updated.',
    schema: {
      example: {
        animalId: 1,
        code: 'CO-12345',
        status: 'sold',
        lotId: 10
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Animal not found.' })
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto, @Req() req: any) {
    return this.animalsService.update(+id, updateAnimalDto, this.getTenantId(req));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an animal' })
  @ApiResponse({
    status: 200,
    description: 'The animal has been successfully deleted.',
    schema: {
      example: {
        message: 'Animal deleted successfully'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Animal not found.' })
  remove(@Param('id') id: string, @Req() req: any) {
    return this.animalsService.remove(+id, this.getTenantId(req));
  }
}
