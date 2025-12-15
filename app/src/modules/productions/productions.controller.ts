import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ProductionsService } from './productions.service';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';

@ApiTags('Productions')
@ApiHeader({
  name: 'X-Tenant-ID',
  description: 'Tenant ID required for all operations',
  required: true,
})
@Controller('productions')
export class ProductionsController {
  constructor(private readonly productionsService: ProductionsService) { }

  private getTenantId(req: any): number {
    return parseInt(req.tenantId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a production record' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    schema: {
      example: {
        productionId: 1,
        date: '2023-10-25',
        productType: 'leche',
        quantity: 25.5,
        unit: 'litros',
        animalId: 1,
        tenantId: 1
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createProductionDto: CreateProductionDto, @Req() req: any) {
    return this.productionsService.create(createProductionDto, this.getTenantId(req));
  }

  @Get()
  @ApiOperation({ summary: 'Get all production records' })
  @ApiResponse({
    status: 200,
    description: 'Return all production records.',
    schema: {
      example: [
        {
          productionId: 1,
          date: '2023-10-25',
          productType: 'leche',
          quantity: 25.5,
          unit: 'litros',
          animalId: 1
        }
      ]
    }
  })
  findAll(@Req() req: any) {
    return this.productionsService.findAll(this.getTenantId(req));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific production record' })
  @ApiResponse({
    status: 200,
    description: 'Return the production record.',
    schema: {
      example: {
        productionId: 1,
        date: '2023-10-25',
        productType: 'leche',
        quantity: 25.5,
        unit: 'litros',
        animalId: 1,
        lotId: null,
        tenantId: 1
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.productionsService.findOne(+id, this.getTenantId(req));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a production record' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    schema: {
      example: {
        productionId: 1,
        date: '2023-10-25',
        productType: 'leche',
        quantity: 30.0,
        unit: 'litros',
        animalId: 1
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  update(@Param('id') id: string, @Body() updateProductionDto: UpdateProductionDto, @Req() req: any) {
    return this.productionsService.update(+id, updateProductionDto, this.getTenantId(req));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a production record' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
    schema: {
      example: {
        message: 'Production record deleted successfully'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Record not found.' })
  remove(@Param('id') id: string, @Req() req: any) {
    return this.productionsService.remove(+id, this.getTenantId(req));
  }
}
