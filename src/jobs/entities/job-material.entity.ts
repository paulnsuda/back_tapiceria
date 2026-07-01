import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Job } from './job.entity';
import { Material } from '../../materials/entities/material.entity'; // Asegúrate de que apunte bien a tu módulo de materiales

@Entity('trabajos_materiales')
export class JobMaterial {
  @PrimaryGeneratedColumn()
  id!: number;

  // 1. Lo enlazamos al Trabajo
  @ManyToOne(() => Job, (job) => job.materialesUsados, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'jobId' })
  job!: Job;

  @Column()
  jobId!: number;

  // 2. Lo enlazamos al Material de tu inventario
  @ManyToOne(() => Material)
  @JoinColumn({ name: 'materialId' })
  material!: Material;

  @Column()
  materialId!: number;

  // 3. ¿Cuánto de este material gastó Pedro en este carro? (ej: 3.5 metros)
  @Column('decimal', { precision: 10, scale: 2 })
  cantidadUsada!: number;

  // 4. Seguridad Financiera: Guardamos el costo que tenía el material HOY.
  // Si en 6 meses el precio del cuero sube, no queremos que nos altere las cuentas de los trabajos viejos.
  @Column('decimal', { precision: 10, scale: 2 })
  precioUnitarioHistorico!: number;
}