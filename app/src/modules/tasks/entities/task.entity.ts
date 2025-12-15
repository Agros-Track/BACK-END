import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Animal } from '../../animals/entities/animals.entity';
import { Lot } from '../../locations/entities/lot.entity';
import { User } from '../../users/entities/user.entity';

@Entity('task')
export class Task {
    @PrimaryGeneratedColumn({ name: 'task_id' })
    taskId: number;

    @Column({ name: 'tenant_id' })
    tenantId: number;

    @Column({ length: 255 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ name: 'assigned_user_id', nullable: true })
    assignedUserId: number;

    @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'assigned_user_id' })
    assignedUser: User;

    @Column({ name: 'lote_id', nullable: true })
    lotId: number;

    @ManyToOne(() => Lot, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'lot_id' })
    lot: Lot;

    @Column({ name: 'animal_id', nullable: true })
    animalId: number;

    @ManyToOne(() => Animal, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'animal_id' })
    animal: Animal;

    @Column({ type: 'date', nullable: true })
    date: string;

    @Column({ type: 'time', nullable: true })
    time: string;

    @Column({ name: 'status', length: 50, default: 'pending' })
    status: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;
}
