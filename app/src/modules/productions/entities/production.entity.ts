import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Animal } from '../../animals/entities/animals.entity';
import { Lote } from '../../locations/entities/lot.entity';

@Entity('produccion')
export class Production {
    @PrimaryGeneratedColumn({ name: 'produccion_id' })
    productionId: number;

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

    @Column({ type: 'date' })
    fecha: string;

    @Column({ name: 'producto_tipo', length: 100 })
    productType: string; // e.g., 'leche', 'carne', 'huevos'

    @Column({ type: 'numeric', precision: 14, scale: 4 })
    cantidad: number;

    @Column({ length: 50 })
    unidad: string; // e.g., 'litros', 'kg'

    @Column({ name: 'sala_origen', length: 255, nullable: true })
    originRoom: string;

    @Column({ name: 'usuario_id', nullable: true })
    userId: number;
}
