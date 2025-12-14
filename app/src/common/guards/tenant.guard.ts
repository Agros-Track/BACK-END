import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TenantService } from 'src/modules/tenant/tenant.service';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private readonly tenantService: TenantService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // SUPER_ADMIN can access all tenants, no validation needed
    if (user?.role === 'SUPER_ADMIN') {
      return true;
    }

    const tenantIdRaw = request['tenantId'];
    const tenantId =
      typeof tenantIdRaw === 'number' ? tenantIdRaw : Number(tenantIdRaw);

    if (!tenantId || Number.isNaN(tenantId)) {
      throw new NotFoundException('Tenant ID is required for this operation');
    }

    const tenant = await this.tenantService.findOne(tenantId);

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    // Regular users can only access their own tenant
    if (user?.tenantId !== tenant.tenant_id) {
      throw new ForbiddenException('Access denied to this tenant');
    }

    request['tenant'] = tenant;

    return true;
  }
}
