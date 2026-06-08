import { IsString, IsNotEmpty, IsNumber, Min, IsArray, IsOptional } from 'class-validator';

export class CreateProformaDto {
  @IsString()
  @IsNotEmpty()
  nombreCliente!: string;

  @IsString()
  @IsOptional()
  vehiculo?: string;

  @IsArray()
  @IsNotEmpty()
  materialesUsados!: {
    materialId: number;
    nombre: string;
    cantidad: number;
    precioUnitario: number;
  }[];

  @IsNumber()
  @Min(0)
  porcentajeGanancia!: number;
}