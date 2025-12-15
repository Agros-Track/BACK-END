import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Animal } from '../../animals/entities/animal.entity';
import { Enfermedad } from './enfermedad.entity';
import { User } from '../../users/entities/user.entity';

@Entity('tratamiento')
export class Tratamiento {
    @PrimaryGeneratedColumn({ name: 'tratamiento_id' })
    tratamientoId: number;

    @Column({ name: 'tenant_id' })
    tenantId: number;

    @Column({ name: 'animal_id' })
    animalId: number;

    @ManyToOne(() => Animal, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'animal_id' })
    animal: Animal;

    @Column({ name: 'enfermedad_id', nullable: true })
    enfermedadId: number;

    @ManyToOne(() => Enfermedad, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'enfermedad_id' })
    enfermedad: Enfermedad;

    @Column({ nullable: true })
    medicamento: string;

    @Column({ nullable: true })
    dosis: string;

    @Column({ name: 'duracion_dias', nullable: true })
    duracionDias: number;

    @Column({ name: 'fecha_inicio', type: 'date', nullable: true })
    fechaInicio: Date;

    @Column({ name: 'fecha_fin', type: 'date', nullable: true })
    fechaFin: Date;

    @Column({ nullable: true })
    estado: string;

    @Column({ name: 'usuario_id', nullable: true })
    usuarioId: number;

    @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'usuario_id' })
    usuario: User;
}
