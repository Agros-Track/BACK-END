import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ProductionsService } from './productions.service';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Productions')
@ApiSecurity('JWT-auth', ['JWT-auth'])
@ApiSecurity('tenant-id', ['tenant-id'])
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('productions')
export class ProductionsController {
  constructor(private readonly productionsService: ProductionsService) { }

  private getTenantId(req: any): number {
    return parseInt(req.tenantId);
  }

  @Post()
  @Roles('ADMIN_TENANT','TRABAJADOR')
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
  @Roles('ADMIN_TENANT','TRABAJADOR')
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
  @Roles('ADMIN_TENANT','TRABAJADOR')
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
  @Roles('ADMIN_TENANT','TRABAJADOR')
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
  @Roles('ADMIN_TENANT')
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
