import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Farm } from './farm.entity';

@Entity('lot')
export class Lot {
    @PrimaryGeneratedColumn({ name: 'lot_id' })
    lotId: number;

    @Column({ name: 'farm_id' })
    farmId: number;

    @ManyToOne(() => Farm, (farm) => farm.lots, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'farm_id' })
    farm: Farm;

    @Column()
    name: string;

    @Column({ nullable: true })
    type: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ nullable: true })
    coordinates: string;

    @Column({ nullable: true })
    status: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;
}
