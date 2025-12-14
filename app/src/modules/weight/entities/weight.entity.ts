import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Animal } from '../../animals/entities/animals.entity';

@Entity('pesaje')
export class Weight {
    @PrimaryGeneratedColumn({ name: 'peso_id' })
    weightId: number;

    @Column({ name: 'tenant_id' })
    tenantId: number;

    @Column({ name: 'animal_id' })
    animalId: number;

    @ManyToOne(() => Animal, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'animal_id' })
    animal: Animal;

    @Column({ name: 'fecha', type: 'date' })
    date: Date;

    @Column({ name: 'peso', type: 'numeric', precision: 12, scale: 3 })
    weight: number;

    @Column({ name: 'usuario_id', nullable: true })
    userId: number;
}
