<<<<<<< HEAD
export class User {}
=======
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('usuario')
export class User {
    @PrimaryGeneratedColumn({ name: 'usuario_id' })
    usuarioId: number;

    @Column({ name: 'tenant_id' })
    tenantId: number;

    @Column({ name: 'role_id', nullable: true })
    roleId: number;

    @Column()
    nombre: string;

    @Column({ unique: true })
    email: string;

    @Column({ name: 'password_hash' })
    passwordHash: string;

    @Column({ default: 'activo' })
    estado: string;

    @CreateDateColumn({ name: 'creado_en', type: 'timestamptz' })
    creadoEn: Date;

    @UpdateDateColumn({ name: 'actualizado_en', type: 'timestamptz' })
    actualizadoEn: Date;
}
>>>>>>> feature/modules
