import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly rolesRepo: Repository<Role>,
  ) {}

  async create(dto: CreateRoleDto, tenantId: number) {
    // Verificar si el slug ya existe para este tenant
    if (dto.slug) {
      const existing = await this.rolesRepo.findOne({
        where: { slug: dto.slug },
      });
      if (existing) throw new BadRequestException('Role slug already exists');
    }

    const role = this.rolesRepo.create({
      name: dto.name,
      slug: dto.slug ?? null,
      description: dto.description ?? null,
    });
    await this.rolesRepo.save(role);
    return role;
  }

  async findAll(tenantId: number) {
    return this.rolesRepo.find();
  }

  async update(id: number, dto: UpdateRoleDto, tenantId: number) {
    const role = await this.rolesRepo.findOne({ where: { role_id: id } });
    if (!role) throw new NotFoundException('Role not found');

    // Verificar si el nuevo slug ya existe
    if (dto.slug && dto.slug !== role.slug) {
      const existing = await this.rolesRepo.findOne({
        where: { slug: dto.slug },
      });
      if (existing) throw new BadRequestException('Role slug already exists');
    }

    if (dto.name) role.name = dto.name;
    if (dto.slug !== undefined) role.slug = dto.slug ?? null;
    if (dto.description !== undefined)
      role.description = dto.description ?? null;

    await this.rolesRepo.save(role);
    return role;
  }
}
