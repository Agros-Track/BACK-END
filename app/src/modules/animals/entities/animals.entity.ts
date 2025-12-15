<<<<<<< HEAD
export class Animal {}
=======
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
import { Farm } from '../../locations/entities/farm.entity';
import { Lot } from '../../locations/entities/lot.entity';

@Entity('animal')
export class Animal {
    @PrimaryGeneratedColumn({ name: 'animal_id' })
    animalId: number;

    @Column({ name: 'tenant_id' })
    tenantId: number;

    @Column({ name: 'farm_id' })
    farmId: number;

    @ManyToOne(() => Farm, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'farm_id' })
    farm: Farm;

    @Column({ name: 'lot_id', nullable: true })
    lotId: number;

    @ManyToOne(() => Lot, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'lot_id' })
    lot: Lot;

    @Column({ unique: true })
    code: string;

    @Column({ nullable: true })
    type: string;

    @Column({ nullable: true })
    breed: string;

    @Column({ nullable: true })
    sex: string;

    @Column({ name: 'birth_date', type: 'date', nullable: true })
    birthDate: Date;

    @Column({ default: 'active' })
    status: string;

    @Column({ name: 'photo_url', nullable: true })
    photoUrl: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;
}
>>>>>>> feature/modules
