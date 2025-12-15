import { Module } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { MovementsController } from './movements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LotMovement } from './entities/lot-movement.entity';
import { AnimalsModule } from '../animals/animals.module';
import { LocationsModule } from '../locations/locations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LotMovement]),
    AnimalsModule,
    LocationsModule,
  ],
  controllers: [MovementsController],
  providers: [MovementsService],
})
export class MovementsModule { }
