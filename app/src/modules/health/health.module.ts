import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacuna } from './entities/vaccine.entity';
import { Enfermedad } from './entities/disease.entity';
import { Tratamiento } from './entities/treatment.entity';
import { AnimalsModule } from '../animals/animals.module';
import { LocationsModule } from '../locations/locations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vacuna, Enfermedad, Tratamiento]),
    AnimalsModule,
    LocationsModule,
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule { }
