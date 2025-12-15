import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
<<<<<<< HEAD

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
=======
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
>>>>>>> feature/modules
