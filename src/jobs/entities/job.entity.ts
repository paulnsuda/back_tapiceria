import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Payment } from '../../payments/entities/payment.entity'; // Conectamos con los pagos que ya hicimos
import { JobMaterial } from './job-material.entity';

// Definimos las fases reales de la tapicería para que el cliente las vea
export enum JobStatus {
  RECEPCION = 'recepcion',       // Auto ingresado
  DESARMADO = 'desarmado',       // Quitando asientos/paneles
  TAPIZADO = 'tapizado',         // Costura, armado con las 5 rayas horizontales, etc.
  ARMADO = 'armado',             // Volviendo a montar en el vehículo
  LISTO = 'listo',               // Terminado, esperando al cliente
  ENTREGADO = 'entregado'        // Vehículo entregado
}

@Entity('trabajos')
export class Job {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  clienteNombre!: string;

  @Column({ length: 15 })
  placaVehiculo!: string; // Clave para que el cliente rastree su auto luego

  @Column('text')
  descripcion!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  costoTotal!: number;

  // El nuevo estado técnico
  @Column({
    type: 'enum',
    enum: JobStatus,
    default: JobStatus.RECEPCION,
  })
  estado!: JobStatus;

  // Fecha límite de entrega (para la alerta de agenda que pediste)
  @Column({ type: 'date', nullable: true })
  fechaEntrega!: string; 

  @CreateDateColumn()
  fechaIngreso!: Date;

  @UpdateDateColumn()
  ultimaActualizacion!: Date; // Útil para saber cuándo cambió de estado

  // Un trabajo tiene muchos pagos
  @OneToMany(() => Payment, (payment) => payment.job)
  pagos!: Payment[];

  // Un trabajo tiene muchos materiales usados
  @OneToMany(() => JobMaterial, (jobMaterial) => jobMaterial.job)
  materialesUsados!: JobMaterial[];
}