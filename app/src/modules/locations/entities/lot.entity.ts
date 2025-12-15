import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Finca } from './farm.entity';

@Entity('lote')
export class Lote {
    @PrimaryGeneratedColumn({ name: 'lote_id' })
    loteId: number;

    @Column({ name: 'finca_id' })
    fincaId: number;

    @ManyToOne(() => Finca, (finca) => finca.lotes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'finca_id' })
    finca: Finca;

    @Column()
    nombre: string;

    @Column({ nullable: true })
    tipo: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column({ nullable: true })
    coordenadas: string;

    @Column({ nullable: true })
    estado: string;

    @CreateDateColumn({ name: 'creado_en', type: 'timestamptz' })
    creadoEn: Date;

    @UpdateDateColumn({ name: 'actualizado_en', type: 'timestamptz' })
    actualizadoEn: Date;
}
