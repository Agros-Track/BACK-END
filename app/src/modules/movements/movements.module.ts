import { Module } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { MovementsController } from './movements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientoLote } from './entities/movimiento-lote.entity';
import { AnimalsModule } from '../animals/animals.module';
import { LocationsModule } from '../locations/locations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovimientoLote]),
    AnimalsModule,
    LocationsModule,
  ],
  controllers: [MovementsController],
  providers: [MovementsService],
})
export class MovementsModule { }
