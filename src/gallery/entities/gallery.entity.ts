import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('gallery')
export class Gallery {
  @PrimaryGeneratedColumn()
  id!: number; // <-- Agregamos el !

  @Column()
  titulo!: string; // <-- Agregamos el !

  @Column()
  url!: string; // <-- Agregamos el !

  @CreateDateColumn()
  fechaSubida!: Date; // <-- Agregamos el !
}