import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly rolesRepo: Repository<Role>,
  ) {}

  async create(dto: CreateRoleDto) {
    // Check if the slug already exists for this tenant
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

  async findAll() {
    return this.rolesRepo.find();
  }

}
