import { IsString, IsNumber, Min, IsNotEmpty } from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @Min(0) // El precio no puede ser negativo
  precioUnitario: number;

  @IsString()
  unidadMedida: string;

  @IsNumber()
  @Min(0)
  stock: number;
}