import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum JobStatus {
  PENDIENTE = 'pendiente',
  EN_PROCESO = 'en_proceso',
  TERMINADO = 'terminado',
}

@Entity('trabajos')
export class Job {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  descripcion!: string; 

  @Column()
  nombreCliente!: string;

  @Column({ nullable: true })
  telefonoCliente!: string; 

  // ¡AQUÍ ESTÁ LA NUEVA COLUMNA DEL DINERO!
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  presupuestoTotal!: number;

  @Column({
    type: 'enum',
    enum: JobStatus,
    default: JobStatus.PENDIENTE,
  })
  estado!: JobStatus;

  @Column('date')
  fechaEntrega!: string; 

  @CreateDateColumn()
  fechaCreacion!: Date;
}