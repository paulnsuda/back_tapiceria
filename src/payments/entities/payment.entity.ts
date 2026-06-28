import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
// 👇 AQUÍ ESTÁ EL CAMBIO: Importamos Job desde tu carpeta jobs
import { Job } from '../../jobs/entities/job.entity'; 

export enum PaymentType {
  ANTICIPO = 'anticipo',
  SALDO = 'saldo',
  TOTAL = 'total', // Pago completo en un solo movimiento
}

@Entity('pagos')
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  // 👇 Así le decimos a TypeORM que se relacione con tu entidad Job
  @ManyToOne(() => Job)
  @JoinColumn({ name: 'jobId' }) 
  job!: Job; 

  @Column()
  jobId!: number; // Mantenemos esto para cuando solo quieras consultar o guardar el puro ID

  @Column('decimal', { precision: 10, scale: 2 })
  monto!: number; 

  @Column({
    type: 'enum',
    enum: PaymentType,
    default: PaymentType.ANTICIPO,
  })
  tipoPago!: PaymentType;

  @Column({ nullable: true })
  notas!: string; 

  @CreateDateColumn()
  fechaPago!: Date;
}