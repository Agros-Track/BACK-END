import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiSecurity,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description:
      'Authenticate user with email and password. Returns JWT token and user data. SUPER_ADMIN does not require x-tenant-id header.',
  })
  @ApiSecurity('tenant-id')
  @ApiResponse({
    status: 200,
    description: 'Successful login',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          user_id: 1,
          name: 'Juan Pérez',
          email: 'admin@farm1.com',
          role: { role_id: 1, name: 'Admin Tenant', slug: 'ADMIN_TENANT' },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials or blocked user',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async login(@Body() dto: LoginAuthDto, @Req() req: any) {
    const tenantId = req['tenantId'];
    return this.authService.login(dto, tenantId);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Get current profile',
    description: 'Returns authenticated user information based on JWT token',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile',
    schema: {
      example: {
        user_id: 1,
        tenant_id: 1,
        name: 'Juan Pérez',
        email: 'admin@farm1.com',
        role: { role_id: 1, name: 'Admin Tenant', slug: 'ADMIN_TENANT' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  async me(@CurrentUser() user: any) {
    return this.authService.me(user);
  }
}
