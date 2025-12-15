import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiSecurity,
} from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

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
  findAll() {
    return this.rolesService.findAll();
  }

  
}
