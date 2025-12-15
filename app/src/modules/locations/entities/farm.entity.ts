import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Lot } from './lot.entity';

@Entity('farm')
export class Farm {
    @PrimaryGeneratedColumn({ name: 'farm_id' })
    farmId: number;

    @Column({ name: 'tenant_id' })
    tenantId: number;

    @Column()
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @OneToMany(() => Lot, (lot) => lot.farm)
    lots: Lot[];
}
