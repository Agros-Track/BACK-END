import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Animal } from '../../animals/entities/animals.entity';
import { Lote } from '../../locations/entities/lot.entity';
import { User } from '../../users/entities/user.entity';

@Entity('vacuna')
export class Vacuna {
    @PrimaryGeneratedColumn({ name: 'vacuna_id' })
    vacunaId: number;

    @Column({ name: 'tenant_id' })
    tenantId: number;

    @Column({ name: 'animal_id', nullable: true })
    animalId: number;

    @ManyToOne(() => Animal, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'animal_id' })
    animal: Animal;

    @Column({ name: 'lote_id', nullable: true })
    loteId: number;

    @ManyToOne(() => Lote, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'lote_id' })
    lote: Lote;

    @Column()
    tipo: string;

    @Column({ name: 'fecha_aplicacion', type: 'date', nullable: true })
    fechaAplicacion: Date;

    @Column({ name: 'fecha_proxima', type: 'date', nullable: true })
    fechaProxima: Date;

    @Column({ name: 'usuario_id', nullable: true })
    usuarioId: number;

    @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'usuario_id' })
    usuario: User;

    @Column({ type: 'text', nullable: true })
    nota: string;
}
