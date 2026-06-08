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
  descripcion!: string; // Ej: "Tapizado de volante y asientos de cuero"

  @Column()
  nombreCliente!: string;

  @Column({ nullable: true })
  telefonoCliente!: string; // Nos servirá para cuando integremos WhatsApp

  @Column({
    type: 'enum',
    enum: JobStatus,
    default: JobStatus.PENDIENTE,
  })
  estado!: JobStatus;

  @Column('date')
  fechaEntrega!: string; // Formato YYYY-MM-DD

  @CreateDateColumn()
  fechaCreacion!: Date;
}