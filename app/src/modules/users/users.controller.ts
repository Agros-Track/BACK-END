import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@ApiSecurity('JWT-auth', ['JWT-auth'])
@ApiSecurity('tenant-id', ['tenant-id'])
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('ADMIN_TENANT')
  @ApiOperation({
    summary: 'Create user',
    description:
      'Creates a new user in the current tenant. Only accessible for ADMIN_TENANT.',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    schema: {
      example: {
        user_id: 3,
        tenant_id: 1,
        name: 'Juan Pérez',
        email: 'juan.perez@farm1.com',
        role: { role_id: 2, name: 'Trabajador', slug: 'TRABAJADOR' },
        status: 'active',
        created_at: '2025-12-14T10:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid data or duplicate email' })
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  @ApiResponse({
    status: 403,
    description: 'No permissions (requires ADMIN_TENANT)',
  })
  @ApiResponse({ status: 404, description: 'Role not found' })
  create(@Body() createUserDto: CreateUserDto, @Req() req: any) {
    const tenantId = Number(req['tenantId']);
    return this.usersService.create(createUserDto, tenantId);
  }

  @Get()
  @Roles('ADMIN_TENANT')
  @ApiOperation({
    summary: 'List users',
    description: 'Gets all users from the current tenant',
  })
  @ApiResponse({
    status: 200,
    description: 'User list',
    schema: {
      example: [
        {
          user_id: 1,
          tenant_id: 1,
          name: 'Admin Usuario',
          email: 'admin@farm1.com',
          role: { role_id: 1, name: 'Admin Tenant', slug: 'ADMIN_TENANT' },
        },
      ],
    },
  })
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  @ApiResponse({ status: 403, description: 'No permissions' })
  findAll(@Req() req: any) {
    const tenantId = Number(req['tenantId']);
    return this.usersService.findAll(tenantId);
  }

  @Get(':id')
  @Roles('ADMIN_TENANT')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const tenantId = Number(req['tenantId']);
    return this.usersService.findOne(id, tenantId);
  }

  @Patch(':id')
  @Roles('ADMIN_TENANT')
  @ApiOperation({
    summary: 'Update user',
    description: 'Updates an existing user data',
  })
  @ApiParam({ name: 'id', description: 'User ID', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 404, description: 'User not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: any,
  ) {
    const tenantId = Number(req['tenantId']);
    return this.usersService.update(id, updateUserDto, tenantId);
  }

  @Delete(':id')
  @Roles('ADMIN_TENANT')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Permanently deletes a user',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID to delete',
    type: Number,
    example: 2,
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted',
    schema: { example: { deleted: true } },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const tenantId = Number(req['tenantId']);
    return this.usersService.remove(id, tenantId);
  }
}
