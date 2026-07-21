import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('logs') // Así se llamará la tabla en tu base de datos PostgreSQL
export class Log {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  accion!: string; // Ej: CREAR, EDITAR, ELIMINAR, ERROR

  @Column({ length: 50 })
  modulo!: string; // Ej: Proformas, Trabajos, Materiales

  @Column('text')
  descripcion!: string; // Ej: "Se eliminó el trabajo de Carlos Mendoza"

  @Column({ length: 100, nullable: true })
  usuario!: string; // Quién lo hizo (Por ahora pondremos 'Admin' por defecto)

  @CreateDateColumn()
  fecha!: Date; // NestJS guardará la fecha y hora exacta automáticamente
}