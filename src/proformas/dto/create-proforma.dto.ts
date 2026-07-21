import { IsString, IsNotEmpty, IsNumber, IsOptional, IsEnum, IsDateString, IsArray } from 'class-validator';
import { ProformaStatus } from '../entities/proforma.entity';

export class CreateProformaDto {
  // --- IDENTIFICACIÓN ---
  @IsString()
  @IsOptional()
  numeroProforma?: string;

  // --- DATOS DEL CLIENTE ---
  @IsString()
  @IsNotEmpty()
  clienteNombre!: string;

  @IsString()
  @IsOptional()
  cedulaRuc?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  @IsOptional()
  telefonoContacto?: string;

  // --- DATOS DEL VEHÍCULO ---
  @IsString()
  @IsOptional()
  vehiculoModelo?: string;

  @IsString()
  @IsOptional()
  vehiculoAno?: string;

  @IsString()
  @IsOptional()
  vehiculoPlaca?: string;

  @IsString()
  @IsOptional()
  vehiculoColor?: string;

  // --- DETALLES DE SERVICIO Y TRABAJO ---
  @IsArray()
  @IsOptional()
  detallesServicio?: any[]; // ¡Súper importante para guardar tu nueva tabla!

  @IsString()
  @IsOptional()
  descripcionTrabajo?: string; // Ahora es opcional por si solo usas la tabla

  // --- PRECIOS Y TOTALES ---
  @IsNumber()
  @IsOptional()
  subtotal?: number;

  @IsNumber()
  @IsOptional()
  precioEstimado?: number;

  @IsNumber()
  @IsOptional()
  precioFinal?: number;

  // --- ESTADO Y FECHAS ---
  @IsEnum(ProformaStatus)
  @IsOptional()
  estado?: ProformaStatus;

  @IsDateString()
  @IsOptional()
  fechaValidez?: string;

  // --- COSTOS INTERNOS ---
  @IsArray()
  @IsOptional()
  materialesUsados?: any[];

  @IsNumber()
  @IsOptional()
  costoBaseMateriales?: number;

  @IsNumber()
  @IsOptional()
  porcentajeGanancia?: number;
}