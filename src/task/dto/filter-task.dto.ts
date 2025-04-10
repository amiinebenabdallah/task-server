import { IsOptional, IsEnum, IsString, IsDateString } from 'class-validator';
import { TaskStatus } from '../types/task-status.enum';
import { TaskPriority } from '../types/task-priority.enum';

export class FilterTaskDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsDateString()
  dueDateBefore?: string;

  @IsOptional()
  @IsDateString()
  dueDateAfter?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsString()
  order?: 'asc' | 'desc';
} 