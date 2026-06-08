import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('materiales')
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string; // Ej: "Cuero Sintético Negro"

  @Column('decimal', { precision: 10, scale: 2 })
  precioUnitario: number; // Tu costo de compra

  @Column()
  unidadMedida: string; // Ej: "Metros", "Unidades", "Galón"

  @Column({ default: 0 })
  stock: number;
}