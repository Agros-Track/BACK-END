import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Lote } from './lot.entity';

@Entity('finca')
export class Finca {
    @PrimaryGeneratedColumn({ name: 'finca_id' })
    fincaId: number;

    @Column({ name: 'tenant_id' })
    tenantId: number;

    @Column()
    nombre: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @CreateDateColumn({ name: 'creado_en', type: 'timestamptz' })
    creadoEn: Date;

    @UpdateDateColumn({ name: 'actualizado_en', type: 'timestamptz' })
    actualizadoEn: Date;

    @OneToMany(() => Lote, (lote) => lote.finca)
    lotes: Lote[];
}
