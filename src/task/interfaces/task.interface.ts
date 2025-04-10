import { TaskPriority } from '../types/task-priority.enum';
import { TaskStatus } from '../types/task-status.enum';

export interface TaskResponse {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate: Date;
  priority: TaskPriority;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TasksResponse {
  tasks: TaskResponse[];
  total: number;
}
