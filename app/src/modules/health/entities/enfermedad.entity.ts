import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Animal } from '../../animals/entities/animal.entity';
import { User } from '../../users/entities/user.entity';

@Entity('enfermedad')
export class Enfermedad {
    @PrimaryGeneratedColumn({ name: 'enfermedad_id' })
    enfermedadId: number;

    @Column({ name: 'tenant_id' })
    tenantId: number;

    @Column({ name: 'animal_id' })
    animalId: number;

    @ManyToOne(() => Animal, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'animal_id' })
    animal: Animal;

    @Column({ type: 'text', nullable: true })
    sintomas: string;

    @Column({ nullable: true })
    diagnostico: string;

    @Column({ nullable: true })
    gravedad: string;

    @Column({ name: 'fecha_registro', type: 'date', default: () => 'CURRENT_DATE' })
    fechaRegistro: Date;

    @Column({ name: 'usuario_id', nullable: true })
    usuarioId: number;

    @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'usuario_id' })
    usuario: User;
}
