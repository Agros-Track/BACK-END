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

@Entity('lot_movement')
export class LotMovement {
    @PrimaryGeneratedColumn({ name: 'movement_id' })
    movementId: number;

    @Column({ name: 'animal_id' })
    animalId: number;

    @ManyToOne(() => Animal, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'animal_id' })
    animal: Animal;

    @Column({ name: 'source_lot_id', nullable: true })
    sourceLotId: number;

    @ManyToOne(() => Lot, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'source_lot_id' })
    sourceLot: Lot;

    @Column({ name: 'destination_lot_id', nullable: true })
    destinationLotId: number;

    @ManyToOne(() => Lot, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'destination_lot_id' })
    destinationLot: Lot;

    @CreateDateColumn({ name: 'movement_date', type: 'timestamptz' })
    movementDate: Date;

    @Column({ name: 'user_id', nullable: true })
    userId: number;

    @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'text', nullable: true })
    note: string;
}
