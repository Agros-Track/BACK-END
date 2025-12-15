import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    @InjectRepository(Role) private readonly rolesRepo: Repository<Role>,
    private readonly jwtService: JwtService,
  ) {}

  // Login
  async login(dto: LoginAuthDto, tenantId?: string | number) {
    // First check if user is SUPER_ADMIN (no tenant required)
    let user = await this.usersRepo.findOne({
      where: { email: dto.email },
      relations: ['role'],
    });

    // If user found and is SUPER_ADMIN, allow login without tenant validation
    if (user && user.role?.slug === 'SUPER_ADMIN') {
      if (user.status !== 'active')
        throw new UnauthorizedException('User is not active');

      const isValid = await bcrypt.compare(dto.password, user.password_hash);
      if (!isValid) throw new UnauthorizedException('Invalid credentials');

      const token = await this.signToken(user);
      return { accessToken: token, user: this.publicUser(user) };
    }

    // For non-SUPER_ADMIN users, tenant_id is required
    if (!tenantId)
      throw new BadRequestException('Tenant ID is required for regular users');

    user = await this.usersRepo.findOne({
      where: { email: dto.email, tenant_id: Number(tenantId) },
      relations: ['role'],
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (user.status !== 'active')
      throw new UnauthorizedException('User is not active');

    const isValid = await bcrypt.compare(dto.password, user.password_hash);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    const token = await this.signToken(user);
    return { accessToken: token, user: this.publicUser(user) };
  }

  // Personal profile
  async me(userPayload: any) {
    const user = await this.usersRepo.findOne({
      where: { user_id: userPayload.sub },
      relations: ['role'],
    });
    if (!user) throw new UnauthorizedException();
    return this.publicUser(user);
  }

  private async signToken(user: User) {
    const payload = {
      sub: user.user_id,
      email: user.email,
      tenantId: user.tenant_id ?? null,
      role: user.role?.slug ?? null,
    };
    return this.jwtService.signAsync(payload);
  }

  private publicUser(user: User) {
    return {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      tenant_id: user.tenant_id,
      role: user.role
        ? {
            role_id: user.role.role_id,
            name: user.role.name,
            slug: user.role.slug,
          }
        : null,
    };
  }
}
