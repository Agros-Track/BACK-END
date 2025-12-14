import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tenant' })
export class Tenant {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  tenant_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  logo?: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country?: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  timezone?: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  measurement_units?: string | null;

  @Column({ type: 'varchar', length: 10, nullable: true })
  language?: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  plan?: string | null;

  @Column({ type: 'int', default: 0 })
  animal_limit: number;

  @Column({ type: 'int', default: 0 })
  user_limit: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'now()' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'now()' })
  updated_at: Date;
}
