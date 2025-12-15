import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
<<<<<<< HEAD
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
=======
>>>>>>> feature/modules

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
<<<<<<< HEAD
  create(@Body() createAuthDto: CreateAuthDto) {
=======
  create(@Body() createAuthDto) {
>>>>>>> feature/modules
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
<<<<<<< HEAD
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
=======
  update(@Param('id') id: string, @Body() updateAuthDto) {
>>>>>>> feature/modules
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
