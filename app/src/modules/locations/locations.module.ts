import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Finca } from './entities/farm.entity';
import { Lote } from './entities/lot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Finca, Lote])],
  controllers: [LocationsController],
  providers: [LocationsService],
  exports: [LocationsService],
})
export class LocationsModule { }
