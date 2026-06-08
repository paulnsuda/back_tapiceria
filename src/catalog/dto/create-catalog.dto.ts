import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateCatalogDto {
  @IsString()
  @IsNotEmpty()
  titulo!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsUrl({}, { message: 'Debe ser un enlace válido de imagen' })
  @IsNotEmpty()
  urlImagen!: string;
}