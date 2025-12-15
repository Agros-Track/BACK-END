import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
} from 'typeorm';
import { Animal } from '../../animals/entities/animals.entity';
import { Lot } from '../../locations/entities/lot.entity';
import { User } from '../../users/entities/user.entity';

@Entity('feeding')
export class Feeding {
    @PrimaryGeneratedColumn({ name: 'feeding_id' })
    feedingId: number;

    @Column({ name: 'tenant_id' })
    tenantId: number;

    @Column({ name: 'date_time', type: 'timestamptz' })
    dateTime: Date;

    @Column({ name: 'user_id', nullable: true })
    userId: number;

    @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ name: 'applies_to', default: 'lot' })
    appliesTo: string;

    @Column({ name: 'lot_id', nullable: true })
    lotId: number;

    @ManyToOne(() => Lot, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'lot_id' })
    lot: Lot;

    @Column({ name: 'animal_id', nullable: true })
    animalId: number;

    @ManyToOne(() => Animal, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'animal_id' })
    animal: Animal;

    @Column({ name: 'feed_type', nullable: true })
    feedType: string;

    @Column({ type: 'numeric', precision: 12, scale: 3, nullable: true })
    quantity: number;

    @Column({ nullable: true })
    unit: string;

    @Column({ type: 'numeric', precision: 14, scale: 2, nullable: true })
    cost: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
