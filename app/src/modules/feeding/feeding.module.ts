import { Module } from '@nestjs/common';
import { FeedingService } from './feeding.service';
import { FeedingController } from './feeding.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feeding } from './entities/feeding.entity';
import { AnimalsModule } from '../animals/animals.module';
import { LocationsModule } from '../locations/locations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feeding]),
    AnimalsModule,
    LocationsModule,
  ],
  controllers: [FeedingController],
  providers: [FeedingService],
})
export class FeedingModule { }
