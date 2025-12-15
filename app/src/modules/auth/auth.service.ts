import { Injectable } from '@nestjs/common';
<<<<<<< HEAD
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  create(createAuthDto: CreateAuthDto) {
=======


@Injectable()
export class AuthService {
  create(createAuthDto) {
>>>>>>> feature/modules
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

<<<<<<< HEAD
  update(id: number, updateAuthDto: UpdateAuthDto) {
=======
  update(id: number, updateAuthDto) {
>>>>>>> feature/modules
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
