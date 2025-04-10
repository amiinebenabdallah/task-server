import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  password: string;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
