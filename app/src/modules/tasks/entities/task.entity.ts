import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Animal } from '../../animals/entities/animal.entity';
import { Lote } from '../../locations/entities/lote.entity';
// import { User } from '../../users/entities/user.entity'; // Assuming Users module exists and entity is exported

@Entity('tarea')
export class Task {
    @PrimaryGeneratedColumn({ name: 'tarea_id' })
    taskId: number;

    @Column({ name: 'tenant_id' })
    tenantId: number;

    @Column({ length: 255 })
    titulo: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column({ name: 'usuario_asignado_id', nullable: true })
    assignedUserId: number;

    // @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
    // @JoinColumn({ name: 'usuario_asignado_id' })
    // assignedUser: User;

    @Column({ name: 'lote_id', nullable: true })
    loteId: number;

    @ManyToOne(() => Lote, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'lote_id' })
    lote: Lote;

    @Column({ name: 'animal_id', nullable: true })
    animalId: number;

    @ManyToOne(() => Animal, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'animal_id' })
    animal: Animal;

    @Column({ type: 'date', nullable: true })
    fecha: string;

    @Column({ type: 'time', nullable: true })
    hora: string;

    @Column({ length: 50, default: 'pendiente' })
    estado: string;

    @CreateDateColumn({ name: 'creado_en', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'actualizado_en', type: 'timestamptz' })
    updatedAt: Date;
}
