import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Animal } from '../../animals/entities/animals.entity';
import { Disease } from './disease.entity';
import { User } from '../../users/entities/user.entity';

@Entity('treatment')
export class Treatment {
    @PrimaryGeneratedColumn({ name: 'treatment_id' })
    treatmentId: number;

    @Column({ name: 'tenant_id' })
    tenantId: number;

    @Column({ name: 'animal_id' })
    animalId: number;

    @ManyToOne(() => Animal, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'animal_id' })
    animal: Animal;

    @Column({ name: 'disease_id', nullable: true })
    diseaseId: number;

    @ManyToOne(() => Disease, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'disease_id' })
    disease: Disease;

    @Column({ nullable: true })
    medication: string;

    @Column({ nullable: true })
    dosage: string;

    @Column({ name: 'duration_days', nullable: true })
    durationDays: number;

    @Column({ name: 'start_date', type: 'date', nullable: true })
    startDate: Date;

    @Column({ name: 'end_date', type: 'date', nullable: true })
    endDate: Date;

    @Column({ nullable: true })
    status: string;

    @Column({ name: 'user_id', nullable: true })
    userId: number;

    @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'user_id' })
    user: User;
}
