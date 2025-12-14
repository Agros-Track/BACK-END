import { SetMetadata } from '@nestjs/common';

export const PUBLIC_TENANT_KEY = 'isPublicTenant';
export const PublicTenant = () => SetMetadata(PUBLIC_TENANT_KEY, true);
