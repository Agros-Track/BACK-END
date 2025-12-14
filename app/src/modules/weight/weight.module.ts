import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeightService } from './weight.service';
import { WeightController } from './weight.controller';
import { Weight } from './entities/weight.entity';
import { AnimalsModule } from '../animals/animals.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Weight]),
        AnimalsModule,
    ],
    controllers: [WeightController],
    providers: [WeightService],
    exports: [WeightService],
})
export class WeightModule { }
