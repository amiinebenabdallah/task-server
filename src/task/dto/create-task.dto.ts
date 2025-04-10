import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { TaskStatus } from '../types/task-status.enum';
import { TaskPriority } from '../types/task-priority.enum';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  status: TaskStatus = TaskStatus.Todo;

  @IsDateString()
  @IsNotEmpty()
  dueDate: string;

  @IsEnum(TaskPriority)
  priority: TaskPriority = TaskPriority.Medium;
}
