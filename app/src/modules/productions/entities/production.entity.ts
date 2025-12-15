import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Animal } from '../../animals/entities/animals.entity';
import { Lot } from '../../locations/entities/lot.entity';

@Entity('production')
export class Production {
    @PrimaryGeneratedColumn({ name: 'production_id' })
    productionId: number;

    @Column({ name: 'tenant_id' })
    tenantId: number;

    @Column({ name: 'animal_id', nullable: true })
    animalId: number;

    @ManyToOne(() => Animal, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'animal_id' })
    animal: Animal;

    @Column({ name: 'lote_id', nullable: true })
    lotId: number;

    @ManyToOne(() => Lot, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'lot_id' })
    lot: Lot;

    @Column({ name: 'date', type: 'date' })
    date: string;

    @Column({ name: 'product_type', length: 100 })
    productType: string; // e.g., 'leche', 'carne', 'huevos'

    @Column({ type: 'numeric', precision: 14, scale: 4 })
    quantity: number;

    @Column({ length: 50 })
    unit: string; // e.g., 'litros', 'kg'

    @Column({ name: 'source_location', length: 255, nullable: true })
    sourceLocation: string;

    @Column({ name: 'user_id', nullable: true })
    userId: number;
}
