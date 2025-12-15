import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Animal } from '../../animals/entities/animals.entity';
import { Lot } from '../../locations/entities/lot.entity';
import { User } from '../../users/entities/user.entity';

@Entity('vaccine')
export class Vaccine {
    @PrimaryGeneratedColumn({ name: 'vaccine_id' })
    vaccineId: number;

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

    @Column()
    type: string;

    @Column({ name: 'application_date', type: 'date', nullable: true })
    applicationDate: Date;

    @Column({ name: 'next_date', type: 'date', nullable: true })
    nextDate: Date;

    @Column({ name: 'user_id', nullable: true })
    userId: number;

    @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'text', nullable: true })
    note: string;
}
