import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  HttpException,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { User } from '../decorators/user.decorator';
import { TaskResponse, TasksResponse } from './interfaces/task.interface';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(ValidationPipe) createTaskDto: CreateTaskDto,
    @User('id') userId: number,
  ): Promise<TaskResponse> {
    try {
      return await this.taskService.create(createTaskDto, userId);
    } catch (error) {
      throw new HttpException(
        { statusCode: 500, message: 'Failed to create task' },
        500,
      );
    }
  }

  @Get()
  async findAll(
    @User('id') userId: number,
    @Query(ValidationPipe) filterDto: FilterTaskDto,
  ): Promise<TasksResponse> {
    try {
      const tasks = await this.taskService.findAll(userId, filterDto);
      return {
        tasks,
        total: tasks.length,
      };
    } catch (error) {
      throw new HttpException(
        { statusCode: 500, message: 'Failed to fetch tasks' },
        500
      );
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
  ): Promise<TaskResponse> {
    try {
      return await this.taskService.findOne(id, userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        { statusCode: 500, message: 'Failed to fetch task' },
        500
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateTaskDto: UpdateTaskDto,
    @User('id') userId: number,
  ): Promise<TaskResponse> {
    try {
      return await this.taskService.update(id, updateTaskDto, userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        { statusCode: 500, message: 'Failed to update task' },
        500
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
  ): Promise<void> {
    try {
      await this.taskService.remove(id, userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        { statusCode: 500, message: 'Failed to delete task' },
        500
      );
    }
  }
}
