import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionsService } from './productions.service';
import { ProductionsController } from './productions.controller';
import { Production } from './entities/production.entity';
import { AnimalsModule } from '../animals/animals.module';
import { LocationsModule } from '../locations/locations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Production]),
    AnimalsModule,
    LocationsModule,
  ],
  controllers: [ProductionsController],
  providers: [ProductionsService],
})
export class ProductionsModule { }
