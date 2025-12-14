import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) { }

  private getTenantId(req: any): number {
    return parseInt(req.tenantId);
  }

  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto, @Req() req: any) {
    return this.animalsService.create(createAnimalDto, this.getTenantId(req));
  }

  @Get()
  findAll(@Req() req: any) {
    return this.animalsService.findAll(this.getTenantId(req));
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.animalsService.findOne(+id, this.getTenantId(req));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto, @Req() req: any) {
    return this.animalsService.update(+id, updateAnimalDto, this.getTenantId(req));
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.animalsService.remove(+id, this.getTenantId(req));
  }
}
