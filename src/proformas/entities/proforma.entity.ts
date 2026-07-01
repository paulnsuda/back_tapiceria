import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

// Definimos los estados por los que pasa una cotización
export enum ProformaStatus {
  PENDIENTE = 'pendiente',   // Se la enviamos pero aún no responde
  ACEPTADA = 'aceptada',     // ¡Dijo que sí! (Aquí luego podríamos convertirla en Trabajo automáticamente)
  RECHAZADA = 'rechazada'    // Dijo que no o estaba muy caro
}

@Entity('proformas')
export class Proforma {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  clienteNombre!: string;

  @Column({ length: 50, nullable: true })
  telefonoContacto!: string; // Útil para tener a la mano a quién cobrar o avisar

  @Column({ length: 50, nullable: true })
  vehiculoModelo!: string; // Ej: Honda Civic 2015

  @Column('text')
  descripcionTrabajo!: string; // Ej: "Tapizado completo en cuero sintético con 5 rayas horizontales"

  @Column('decimal', { precision: 10, scale: 2 })
  precioEstimado!: number;

  @Column({
    type: 'enum',
    enum: ProformaStatus,
    default: ProformaStatus.PENDIENTE,
  })
  estado!: ProformaStatus;

  // Fecha en la que se creó la cotización
  @CreateDateColumn()
  fechaEmision!: Date;

  // Las proformas no duran para siempre (ej: válidas por 15 días)
  @Column({ type: 'date', nullable: true })
  fechaValidez!: string; 
}