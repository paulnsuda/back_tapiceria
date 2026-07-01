import { IsNumber, IsPositive, Min } from 'class-validator';

export class AddMaterialToJobDto {
  @IsNumber()
  @IsPositive()
  materialId!: number;

  @IsNumber()
  @Min(0.01, { message: 'La cantidad usada debe ser mayor a 0' })
  cantidadUsada!: number;
}