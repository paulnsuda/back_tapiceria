import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('servicios_base')
export class ServicioBase {
  @PrimaryGeneratedColumn()
  id!: number;

  // Nombre del servicio (Ej: "Tapizado completo Hyundai H1")
  @Column({ length: 200 })
  nombre!: string;

  // El precio oficial que quieres estandarizar
  @Column('decimal', { precision: 10, scale: 2 })
  precioSugerido!: number;

  // Tipo de vehículo o categoría (Opcional, pero ayuda a filtrar)
  @Column({ length: 50, nullable: true })
  categoria!: string; 

  // Para poder "desactivar" un precio si ya no lo ofreces, sin borrarlo del historial
  @Column({ default: true })
  activo!: boolean;
}