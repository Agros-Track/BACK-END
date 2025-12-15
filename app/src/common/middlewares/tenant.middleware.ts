<<<<<<< HEAD
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
=======
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
>>>>>>> develop

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
<<<<<<< HEAD
    const tenantId = req.headers['x-tenant-id'];

    // Store tenantId if present, but don't require it
    // Auth logic will validate based on user role
    if (tenantId) {
      req['tenantId'] = tenantId;
    }

    next();
  }
}
=======
    const tenantId = req.headers["x-tenant-id"];
    
    if (!tenantId) {
      return res.status(400).json({ message: "Tenant ID header is missing" });
    }

    req['tenantId'] = tenantId;
    next();
  }
}
>>>>>>> develop
