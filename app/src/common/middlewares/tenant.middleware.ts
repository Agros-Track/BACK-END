import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    const tenantId = req.headers['x-tenant-id'];

    // Store tenantId if present, but don't require it
    // Auth logic will validate based on user role
    if (tenantId) {
      req['tenantId'] = tenantId;
    }

    next();
  }
}

