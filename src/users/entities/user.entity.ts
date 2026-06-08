import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Definimos los roles permitidos
export enum UserRole {
  ADMIN = 'admin', // El dueño de la tapicería
  CLIENT = 'client', // El público general
}

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn()
  id!: number; // <-- Agregamos el !

  @Column({ unique: true })
  email!: string; // <-- Agregamos el !

  @Column()
  password!: string; // <-- Agregamos el !

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  rol!: UserRole; // <-- Agregamos el !
}