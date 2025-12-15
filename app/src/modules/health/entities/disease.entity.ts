import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Animal } from '../../animals/entities/animals.entity';
import { User } from '../../users/entities/user.entity';

@Entity('disease')
export class Disease {
    @PrimaryGeneratedColumn({ name: 'disease_id' })
    diseaseId: number;

    @Column({ name: 'tenant_id' })
    tenantId: number;

    @Column({ name: 'animal_id' })
    animalId: number;

    @ManyToOne(() => Animal, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'animal_id' })
    animal: Animal;

    @Column({ type: 'text', nullable: true })
    symptoms: string;

    @Column({ nullable: true })
    diagnosis: string;

    @Column({ nullable: true })
    severity: string;

    @Column({ name: 'registration_date', type: 'date', default: () => 'CURRENT_DATE' })
    registrationDate: Date;

    @Column({ name: 'user_id', nullable: true })
    userId: number;

    @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'user_id' })
    user: User;
}
