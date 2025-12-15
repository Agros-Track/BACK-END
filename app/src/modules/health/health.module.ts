import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacuna } from './entities/vacuna.entity';
import { Enfermedad } from './entities/enfermedad.entity';
import { Tratamiento } from './entities/tratamiento.entity';
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
