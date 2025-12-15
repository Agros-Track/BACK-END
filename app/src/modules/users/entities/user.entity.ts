import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

// Use explicit quoted table name to match schema and avoid reserved word issues
@Entity({ name: 'user_app' })
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'bigint', nullable: true })
  tenant_id: number | null;

  @ManyToOne(() => Role, (role) => role.users, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'role_id' })
  role?: Role | null;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 512 })
  password_hash: string;

  @Column({ type: 'varchar', length: 50, default: 'active' })
  status: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'now()' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'now()' })
  updated_at: Date;
}
