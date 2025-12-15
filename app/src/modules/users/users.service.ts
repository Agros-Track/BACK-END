import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    @InjectRepository(Role) private readonly rolesRepo: Repository<Role>,
  ) {}

  async create(dto: CreateUserDto, tenantId: number) {
    const existing = await this.usersRepo.findOne({
      where: { email: dto.email },
    });
    if (existing) throw new BadRequestException('Email already registered');

    let role: Role | null = null;
    if (dto.role_id) {
      role = await this.rolesRepo.findOne({ where: { role_id: dto.role_id } });
      if (!role) throw new BadRequestException('Role not found for tenant');
    }

    const password_hash = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepo.create({
      name: dto.name,
      email: dto.email,
      password_hash,
      tenant_id: tenantId,
      role,
      status: dto.status ?? 'active',
    });
    await this.usersRepo.save(user);
    return this.publicUser(user);
  }

  async findAll(tenantId: number) {
    const users = await this.usersRepo.find({
      where: { tenant_id: tenantId },
      relations: ['role'],
    });
    return users.map((u) => this.publicUser(u));
  }

  async findOne(id: number, tenantId: number) {
    const user = await this.usersRepo.findOne({
      where: { user_id: id, tenant_id: tenantId },
      relations: ['role'],
    });
    if (!user) throw new NotFoundException('User not found');
    return this.publicUser(user);
  }

  async update(id: number, dto: UpdateUserDto, tenantId: number) {
    const user = await this.usersRepo.findOne({
      where: { user_id: id, tenant_id: tenantId },
      relations: ['role'],
    });
    if (!user) throw new NotFoundException('User not found');

    let role = user.role;
    if (dto.role_id) {
      role = await this.rolesRepo.findOne({ where: { role_id: dto.role_id } });
      if (!role) throw new BadRequestException('Role not found for tenant');
    }

    if (dto.email && dto.email !== user.email) {
      const dup = await this.usersRepo.findOne({ where: { email: dto.email } });
      if (dup) throw new BadRequestException('Email already registered');
      user.email = dto.email;
    }

    // Basic fields
    if (dto.name) user.name = dto.name;
    if (dto.status) user.status = dto.status;
    if (dto.password) user.password_hash = await bcrypt.hash(dto.password, 10);
    user.role = role ?? null;

    await this.usersRepo.save(user);
    return this.publicUser(user);
  }

  async remove(id: number, tenantId: number) {
    const user = await this.usersRepo.findOne({
      where: { user_id: id, tenant_id: tenantId },
    });
    if (!user) throw new NotFoundException('User not found');
    await this.usersRepo.delete(user.user_id);
    return { deleted: true };
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
