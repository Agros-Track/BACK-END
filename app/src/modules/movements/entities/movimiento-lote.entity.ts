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

@Entity('movimiento_lote')
export class MovimientoLote {
    @PrimaryGeneratedColumn({ name: 'movimiento_id' })
    movimientoId: number;

    @Column({ name: 'animal_id' })
    animalId: number;

    @ManyToOne(() => Animal, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'animal_id' })
    animal: Animal;

    @Column({ name: 'lote_origen_id', nullable: true })
    loteOrigenId: number;

    @ManyToOne(() => Lote, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'lote_origen_id' })
    loteOrigen: Lote;

    @Column({ name: 'lote_destino_id', nullable: true })
    loteDestinoId: number;

    @ManyToOne(() => Lote, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'lote_destino_id' })
    loteDestino: Lote;

    @CreateDateColumn({ name: 'fecha_movimiento', type: 'timestamptz' })
    fechaMovimiento: Date;

    @Column({ name: 'usuario_id', nullable: true })
    usuarioId: number;

    @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'usuario_id' })
    usuario: User;

    @Column({ type: 'text', nullable: true })
    nota: string;
}
