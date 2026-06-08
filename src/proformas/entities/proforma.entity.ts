import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('proformas')
export class Proforma {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombreCliente!: string;

  @Column({ nullable: true })
  vehiculo!: string; // Ej: "Toyota Fortuner - Asientos"

  // Guardaremos la lista de materiales usados como un arreglo de objetos JSON
  @Column('jsonb')
  materialesUsados!: {
    materialId: number;
    nombre: string;
    cantidad: number;
    precioUnitario: number;
  }[];

  @Column('decimal', { precision: 10, scale: 2 })
  costoBaseMateriales!: number; // La suma de lo que te costó a ti

  @Column('int')
  porcentajeGanancia!: number; // El número que moverás con la barrita (ej: 20, 30)

  @Column('decimal', { precision: 10, scale: 2 })
  precioFinalCliente!: number; // El precio con la ganancia incluida

  @CreateDateColumn()
  fechaCreacion!: Date;
}