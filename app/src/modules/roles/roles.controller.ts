import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiSecurity,
  ApiParam,
} from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Roles')
@ApiBearerAuth('JWT-auth')
@ApiSecurity('JWT-auth', ['JWT-auth'])
@ApiSecurity('tenant-id', ['tenant-id'])
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOperation({
    summary: 'List roles',
    description:
      'Gets all global system roles. Roles are shared across all tenants.',
  })
  @ApiResponse({
    status: 200,
    description: 'Role list',
    schema: {
      example: [
        {
          role_id: 1,
          name: 'Admin Tenant',
          slug: 'ADMIN_TENANT',
          description: 'Organization administrator',
          permissions: null,
        },
        {
          role_id: 2,
          name: 'Trabajador',
          slug: 'TRABAJADOR',
          description: 'Operational staff',
          permissions: null,
        },
      ],
    },
  })
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  findAll(@Req() req: any) {
    const tenantId = Number(req['tenantId']);
    return this.rolesService.findAll(tenantId);
  }

  @Patch(':id')
  @Roles('ADMIN_TENANT')
  @ApiOperation({
    summary: 'Update role',
    description:
      'Updates global role information. Only ADMIN_TENANT can modify roles.',
  })
  @ApiParam({ name: 'id', description: 'Role ID', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Role updated successfully',
    schema: {
      example: {
        role_id: 1,
        name: 'Admin Tenant',
        slug: 'ADMIN_TENANT',
        description: 'Administrator with full permissions',
        permissions: null,
        updated_at: '2025-12-14T10:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({
    status: 403,
    description: 'No permissions (requires ADMIN_TENANT)',
  })
  @ApiResponse({ status: 404, description: 'Role not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
    @Req() req: any,
  ) {
    const tenantId = Number(req['tenantId']);
    return this.rolesService.update(id, updateRoleDto, tenantId);
  }
}
