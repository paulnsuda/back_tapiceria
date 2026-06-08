import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('catalogo')
export class Catalog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string; // Ej: "Tapizado Premium BMW"

  @Column('text')
  descripcion!: string;

  @Column()
  urlImagen!: string; // Aquí guardaremos el link que nos dará Firebase luego

  @CreateDateColumn()
  fechaPublicacion!: Date;
}