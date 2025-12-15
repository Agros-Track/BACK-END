import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant) private readonly tenantsRepo: Repository<Tenant>,
  ) {}

  async create(dto: CreateTenantDto) {
    const tenant = this.tenantsRepo.create({ ...dto });
    await this.tenantsRepo.save(tenant);
    return tenant;
  }

  async findAll() {
    return this.tenantsRepo.find();
  }

  async findOne(id: number) {
    const tenant = await this.tenantsRepo.findOne({ where: { tenant_id: id } });
    if (!tenant) throw new NotFoundException('Tenant not found');
    return tenant;
  }

  async update(id: number, dto: UpdateTenantDto) {
    const tenant = await this.findOne(id);
    Object.assign(tenant, dto);
    await this.tenantsRepo.save(tenant);
    return tenant;
  }

  async remove(id: number) {
    const tenant = await this.findOne(id);
    await this.tenantsRepo.delete(tenant.tenant_id);
    return { deleted: true };
  }
}
