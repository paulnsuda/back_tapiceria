import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum PaymentType {
  ANTICIPO = 'anticipo',
  SALDO = 'saldo',
  TOTAL = 'total', // Pago completo en un solo movimiento
}

@Entity('pagos')
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  jobId!: number; // ID del trabajo al que pertenece este pago

  @Column('decimal', { precision: 10, scale: 2 })
  monto!: number; // Cantidad de dinero (ej: 100.00)

  @Column({
    type: 'enum',
    enum: PaymentType,
    default: PaymentType.ANTICIPO,
  })
  tipoPago!: PaymentType;

  @Column({ nullable: true })
  notas!: string; // Ej: "Dejó en efectivo", "Transferencia Banco Pichincha"

  @CreateDateColumn()
  fechaPago!: Date;
}