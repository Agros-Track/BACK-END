import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers["x-tenant-id"];
    
    if (!tenantId) {
      return res.status(400).json({ message: "Tenant ID header is missing" });
    }

    req['tenantId'] = tenantId;
    next();
  }
}