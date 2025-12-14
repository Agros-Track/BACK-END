import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ProductionsService } from './productions.service';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';

@Controller('productions')
export class ProductionsController {
  constructor(private readonly productionsService: ProductionsService) { }

  private getTenantId(req: any): number {
    return parseInt(req.tenantId);
  }

  @Post()
  create(@Body() createProductionDto: CreateProductionDto, @Req() req: any) {
    return this.productionsService.create(createProductionDto, this.getTenantId(req));
  }

  @Get()
  findAll(@Req() req: any) {
    return this.productionsService.findAll(this.getTenantId(req));
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.productionsService.findOne(+id, this.getTenantId(req));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductionDto: UpdateProductionDto, @Req() req: any) {
    return this.productionsService.update(+id, updateProductionDto, this.getTenantId(req));
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.productionsService.remove(+id, this.getTenantId(req));
  }
}
