import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskResponse } from './interfaces/task.interface';
import { TaskStatus } from './types/task-status.enum';
import { TaskPriority } from './types/task-priority.enum';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  private mapToTaskResponse(task: any): TaskResponse {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status as TaskStatus,
      dueDate: task.due_date,
      priority: task.priority as TaskPriority,
      userId: task.user_id,
      createdAt: task.created_at,
      updatedAt: task.updated_at,
    };
  }

  async create(
    createTaskDto: CreateTaskDto,
    userId: number,
  ): Promise<TaskResponse> {
    const task = await this.prisma.tasks.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status,
        due_date: new Date(createTaskDto.dueDate),
        priority: createTaskDto.priority,
        user_id: userId,
        updated_at: new Date(),
      },
    });

    return this.mapToTaskResponse(task);
  }

  async findAll(
    userId: number,
    filterDto: FilterTaskDto,
  ): Promise<TaskResponse[]> {
    const {
      status,
      priority,
      search,
      dueDateBefore,
      dueDateAfter,
      sortBy,
      order,
    } = filterDto;

    const where: any = { user_id: userId };
    let orderBy: any = { due_date: 'asc' };

    if (status) {
      where.status = status;
    }

    if (priority) {
      where.priority = priority;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (dueDateBefore) {
      where.due_date = {
        ...(where.due_date || {}),
        lte: new Date(dueDateBefore),
      };
    }

    if (dueDateAfter) {
      where.due_date = {
        ...(where.due_date || {}),
        gte: new Date(dueDateAfter),
      };
    }

    if (sortBy) {
      const orderDirection = order === 'desc' ? 'desc' : 'asc';
      const dbField = this.getDbFieldName(sortBy);
      orderBy = {
        [dbField]: orderDirection,
      };
    }

    const tasks = await this.prisma.tasks.findMany({
      where,
      orderBy,
    });

    return tasks.map((task: any) => this.mapToTaskResponse(task));
  }

  async findOne(id: number, userId: number): Promise<TaskResponse> {
    const task = await this.prisma.tasks.findFirst({
      where: { id, user_id: userId },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.mapToTaskResponse(task);
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    userId: number,
  ): Promise<TaskResponse> {
    await this.findOne(id, userId);

    const data: any = {};

    if ('title' in updateTaskDto) data.title = updateTaskDto.title;
    if ('description' in updateTaskDto)
      data.description = updateTaskDto.description;
    if ('status' in updateTaskDto) data.status = updateTaskDto.status;
    if ('priority' in updateTaskDto) data.priority = updateTaskDto.priority;
    if ('dueDate' in updateTaskDto && updateTaskDto.dueDate)
      data.due_date = new Date(updateTaskDto.dueDate);

    data.updated_at = new Date();

    const task = await this.prisma.tasks.update({
      where: { id },
      data,
    });

    return this.mapToTaskResponse(task);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.findOne(id, userId);

    await this.prisma.tasks.delete({
      where: { id },
    });

    return;
  }

  // Helper to convert API field names to database field names
  private getDbFieldName(apiField: string): string {
    const fieldMap: Record<string, string> = {
      title: 'title',
      description: 'description',
      status: 'status',
      dueDate: 'due_date',
      priority: 'priority',
      userId: 'user_id',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    };

    return fieldMap[apiField] || apiField;
  }
}
