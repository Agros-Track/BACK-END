import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Animal } from '../../animals/entities/animals.entity';

@Entity('weight')
export class Weight {
    @PrimaryGeneratedColumn({ name: 'weight_id' })
    weightId: number;

    @Column({ name: 'tenant_id' })
    tenantId: number;

    @Column({ name: 'animal_id' })
    animalId: number;

    @ManyToOne(() => Animal, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'animal_id' })
    animal: Animal;

    @Column({ name: 'date', type: 'date' })
    date: Date;

    @Column({ name: 'weight', type: 'numeric', precision: 12, scale: 3 })
    weight: number;

    @Column({ name: 'user_id', nullable: true })
    userId: number;
}
