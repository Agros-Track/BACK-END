import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiSecurity,
  ApiParam,
} from '@nestjs/swagger';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Tenant')
@ApiBearerAuth('JWT-auth')
@ApiSecurity('JWT-auth', ['JWT-auth'])
@ApiSecurity('tenant-id', ['tenant-id'])
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  @Roles('SUPER_ADMIN')
  @ApiOperation({
    summary: 'Create tenant',
    description:
      'Creates a new organization/tenant in the system. Only for SUPER_ADMIN.',
  })
  @ApiResponse({
    status: 201,
    description: 'Tenant created successfully',
    schema: {
      example: {
        tenant_id: 2,
        name: 'Finca El Paraíso',
        country: 'Colombia',
        timezone: 'America/Bogota',
        measurement_units: 'metric',
        language: 'es',
        plan: 'premium',
        animal_limit: 500,
        user_limit: 10,
        created_at: '2025-12-14T10:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({
    status: 403,
    description: 'No permissions (requires SUPER_ADMIN)',
  })
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.create(createTenantDto);
  }

  @Get()
  @Roles('SUPER_ADMIN')
  @ApiOperation({
    summary: 'Get all tenants',
    description: 'Returns tenants information',
  })
  @ApiResponse({ status: 200, description: 'Tenants information' })
  @ApiResponse({ status: 404, description: 'Tenant not found' })
  findAll() {
    return this.tenantService.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN')
  @ApiOperation({ summary: 'Get tenant by ID' })
  @ApiParam({ name: 'id', description: 'Tenant ID', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Tenant found' })
  @ApiResponse({ status: 404, description: 'Tenant not found' })
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const tenantId = Number(req['tenantId']);
    if (tenantId !== id) return this.tenantService.findOne(tenantId);
    return this.tenantService.findOne(id);
  }

  @Patch(':id')
  @Roles('SUPER_ADMIN')
  @ApiOperation({
    summary: 'Update tenant',
    description: 'Updates tenant configuration',
  })
  @ApiParam({ name: 'id', description: 'Tenant ID', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Tenant updated successfully' })
  @ApiResponse({ status: 404, description: 'Tenant not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTenantDto: UpdateTenantDto,
    @Req() req: any,
  ) {
    const tenantId = Number(req['tenantId']);
    if (tenantId !== id)
      return this.tenantService.update(tenantId, updateTenantDto);
    return this.tenantService.update(id, updateTenantDto);
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN')
  @ApiOperation({
    summary: 'Delete tenant',
    description: 'Permanently deletes a tenant',
  })
  @ApiParam({
    name: 'id',
    description: 'Tenant ID to delete',
    type: Number,
    example: 2,
  })
  @ApiResponse({
    status: 200,
    description: 'Tenant deleted',
    schema: { example: { deleted: true } },
  })
  @ApiResponse({ status: 404, description: 'Tenant not found' })
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const tenantId = Number(req['tenantId']);
    if (tenantId !== id) return this.tenantService.remove(tenantId);
    return this.tenantService.remove(id);
  }
}
