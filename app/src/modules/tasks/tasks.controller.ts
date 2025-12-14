import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';

@ApiTags('Tasks')
@ApiHeader({
  name: 'X-Tenant-ID',
  description: 'Tenant ID required for all operations',
  required: true,
})
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  private getTenantId(req: any): number {
    return parseInt(req.tenantId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a task' })
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
    schema: {
      example: {
        id: 1,
        titulo: 'Vaccinate Lot A',
        estado: 'pendiente',
        fecha: '2023-12-01',
        tenantId: 1
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: any) {
    return this.tasksService.create(createTaskDto, this.getTenantId(req));
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'Return all tasks.',
    schema: {
      example: [
        {
          id: 1,
          titulo: 'Vaccinate Lot A',
          estado: 'pendiente',
          fecha: '2023-12-01'
        }
      ]
    }
  })
  findAll(@Req() req: any) {
    return this.tasksService.findAll(this.getTenantId(req));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific task' })
  @ApiResponse({
    status: 200,
    description: 'Return the task.',
    schema: {
      example: {
        taskId: 1,
        titulo: 'Vaccinate Lot A',
        descripcion: 'Apply aftosa vaccine',
        estado: 'pendiente',
        fecha: '2023-12-01',
        assignedUserId: 1,
        tenantId: 1
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.tasksService.findOne(+id, this.getTenantId(req));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully updated.',
    schema: {
      example: {
        taskId: 1,
        titulo: 'Vaccinate Lot A',
        estado: 'completada',
        fecha: '2023-12-01'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Req() req: any) {
    return this.tasksService.update(+id, updateTaskDto, this.getTenantId(req));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully deleted.',
    schema: {
      example: {
        message: 'Task deleted successfully'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  remove(@Param('id') id: string, @Req() req: any) {
    return this.tasksService.remove(+id, this.getTenantId(req));
  }
}
