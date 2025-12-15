import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vaccine } from './entities/vaccine.entity';
import { Disease } from './entities/disease.entity';
import { Treatment } from './entities/treatment.entity';
import { AnimalsModule } from '../animals/animals.module';
import { LocationsModule } from '../locations/locations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vaccine, Disease, Treatment]),
    AnimalsModule,
    LocationsModule,
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule { }
