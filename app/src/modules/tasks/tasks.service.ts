import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { AnimalsService } from '../animals/animals.service';
import { LocationsService } from '../locations/locations.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly animalsService: AnimalsService,
    private readonly locationsService: LocationsService,
  ) { }

  async create(createTaskDto: CreateTaskDto, tenantId: number): Promise<Task> {
    if (createTaskDto.animalId) {
      await this.animalsService.findOne(createTaskDto.animalId, tenantId);
    }
    if (createTaskDto.loteId) {
      await this.locationsService.findOneLote(createTaskDto.loteId, tenantId);
    }
    // TODO: Validate assignedUserId if UsersService is available

    const task = this.taskRepository.create({
      ...createTaskDto,
      tenantId,
      estado: createTaskDto.estado || 'pendiente',
    });
    return this.taskRepository.save(task);
  }

  async findAll(tenantId: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: { tenantId },
      order: { fecha: 'ASC', hora: 'ASC' },
      relations: ['animal', 'lote'],
    });
  }

  async findOne(id: number, tenantId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { taskId: id, tenantId },
      relations: ['animal', 'lote'],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, tenantId: number): Promise<Task> {
    const task = await this.findOne(id, tenantId);
    const updated = this.taskRepository.merge(task, updateTaskDto);
    return this.taskRepository.save(updated);
  }

  async remove(id: number, tenantId: number): Promise<void> {
    const task = await this.findOne(id, tenantId);
    await this.taskRepository.remove(task);
  }
}
