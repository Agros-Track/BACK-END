import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
<<<<<<< HEAD

@Module({
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
=======
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animals.entity';
import { LocationsModule } from '../locations/locations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Animal]),
    LocationsModule,
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService],
  exports: [AnimalsService],
})
export class AnimalsModule { }
>>>>>>> feature/modules
