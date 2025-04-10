import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { TaskStatus } from '../types/task-status.enum';
import { TaskPriority } from '../types/task-priority.enum';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;
}
