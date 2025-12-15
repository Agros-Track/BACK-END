import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
} from 'typeorm';
import { Animal } from '../../animals/entities/animal.entity';
import { Lote } from '../../locations/entities/lote.entity';
import { User } from '../../users/entities/user.entity';

@Entity('alimentacion')
export class Alimentacion {
    @PrimaryGeneratedColumn({ name: 'alimentacion_id' })
    alimentacionId: number;

    @Column({ name: 'tenant_id' })
    tenantId: number;

    @CreateDateColumn({ name: 'fecha_hora', type: 'timestamptz' })
    fechaHora: Date;

    @Column({ name: 'usuario_id', nullable: true })
    usuarioId: number;

    @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'usuario_id' })
    usuario: User;

    @Column({ name: 'aplica_a', default: 'lote' })
    aplicaA: string;

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

    @Column({ name: 'tipo_alimento', nullable: true })
    tipoAlimento: string;

    @Column({ type: 'numeric', precision: 12, scale: 3, nullable: true })
    cantidad: number;

    @Column({ nullable: true })
    unidad: string;

    @Column({ type: 'numeric', precision: 14, scale: 2, nullable: true })
    costo: number;

    @CreateDateColumn({ name: 'creado_en', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    creadoEn: Date;
}
