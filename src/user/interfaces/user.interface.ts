export interface User {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
