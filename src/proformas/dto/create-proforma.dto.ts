import { IsString, IsNotEmpty, IsNumber, Min, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ProformaStatus } from '../entities/proforma.entity';

export class CreateProformaDto {
  @IsString()
  @IsNotEmpty()
  clienteNombre!: string;

  @IsString()
  @IsOptional()
  telefonoContacto?: string;

  @IsString()
  @IsOptional()
  vehiculoModelo?: string;

  @IsString()
  @IsNotEmpty()
  descripcionTrabajo!: string;

  @IsNumber()
  @Min(0.01, { message: 'El precio estimado debe ser mayor a 0' })
  precioEstimado!: number;

  @IsEnum(ProformaStatus)
  @IsOptional()
  estado?: ProformaStatus;

  @IsDateString()
  @IsOptional()
  fechaValidez?: string;
}