import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum ProformaStatus {
  PENDIENTE = 'pendiente',
  ACEPTADA = 'aceptada',
  RECHAZADA = 'rechazada'
}

@Entity('proformas')
export class Proforma {
  @PrimaryGeneratedColumn()
  id!: number;

  // --- 1. NUMERO DE PROFORMA (Ej: 048-2026) ---
  @Column({ length: 20, nullable: true })
  numeroProforma!: string;

  // --- 2. DATOS DEL CLIENTE ---
  ç
  @Column({ length: 150 })
  clienteNombre!: string;

  @Column({ length: 20, nullable: true })
  cedulaRuc!: string;

  @Column({ length: 255, nullable: true })
  direccion!: string;

  @Column({ length: 50, nullable: true })
  telefonoContacto!: string;

  // --- 3. DATOS DEL VEHÍCULO ---
  @Column({ length: 50, nullable: true })
  vehiculoModelo!: string; // Aquí pondrás "HINO"

  @Column({ length: 4, nullable: true })
  vehiculoAno!: string;    // Ej: 2027

  @Column({ length: 15, nullable: true })
  vehiculoPlaca!: string;  // Ej: PBB-9021

  @Column({ length: 50, nullable: true })
  vehiculoColor!: string;

  // --- 4. DETALLE DE SERVICIOS (La tablita dinámica) ---
  // Guardará los datos así: [{ cantidad: 2, descripcion: "Asientos", unitario: 50, total: 100 }]
  @Column('json', { nullable: true })
  detallesServicio!: any; 

  // (Mantenemos tu campo antiguo como nullable por compatibilidad, se puede usar para "Observaciones extras")
  @Column('text', { nullable: true })
  descripcionTrabajo!: string;

  // --- 5. TOTALES PARA EL PDF ---
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  subtotal!: number;

  // Tu campo antiguo conservado
  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  precioEstimado!: number; 

  // Este será el TOTAL A PAGAR final de la proforma
  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  precioFinal!: number; 

  // --- 6. ESTADO Y FECHAS ---
  @Column({
    type: 'enum',
    enum: ProformaStatus,
    default: ProformaStatus.PENDIENTE,
  })
  estado!: ProformaStatus;

  @CreateDateColumn()
  fechaCreacion!: Date;

  @Column({ type: 'date', nullable: true })
  fechaValidez!: string; 

  // --- 7. COSTOS INTERNOS (Lo que ya tenías, oculto al cliente) ---
  @Column('json', { nullable: true })
  materialesUsados!: any; 

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  costoBaseMateriales!: number;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  porcentajeGanancia!: number;
}