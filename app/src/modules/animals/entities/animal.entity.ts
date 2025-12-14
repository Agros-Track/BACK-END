import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { Finca } from '../../locations/entities/finca.entity';
import { Lote } from '../../locations/entities/lote.entity';

@Entity('animal')
export class Animal {
    @PrimaryGeneratedColumn({ name: 'animal_id' })
    animalId: number;

    @Column({ name: 'tenant_id' })
    tenantId: number;

    @Column({ name: 'finca_id' })
    fincaId: number;

    @ManyToOne(() => Finca, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'finca_id' })
    finca: Finca;

    @Column({ name: 'lote_id', nullable: true })
    loteId: number;

    @ManyToOne(() => Lote, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'lote_id' })
    lote: Lote;

    @Column({ unique: true })
    codigo: string;

    @Column({ nullable: true })
    tipo: string;

    @Column({ nullable: true })
    raza: string;

    @Column({ nullable: true })
    sexo: string;

    @Column({ name: 'fecha_nacimiento', type: 'date', nullable: true })
    fechaNacimiento: Date;

    @Column({ default: 'activo' })
    estado: string;

    @Column({ name: 'foto_url', nullable: true })
    fotoUrl: string;

    @CreateDateColumn({ name: 'creado_en', type: 'timestamptz' })
    creadoEn: Date;

    @UpdateDateColumn({ name: 'actualizado_en', type: 'timestamptz' })
    actualizadoEn: Date;
}
