// Agregamos IsNumber en la importación
import { IsString, IsNotEmpty, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { JobStatus } from '../entities/job.entity';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsString()
  @IsNotEmpty()
  nombreCliente!: string;

  @IsString()
  @IsOptional()
  telefonoCliente?: string;

  // ¡AQUÍ AUTORIZAMOS EL INGRESO DEL DINERO!
  @IsNumber()
  @IsNotEmpty()
  presupuestoTotal!: number;

  @IsOptional()
  @IsEnum(JobStatus)
  estado?: JobStatus;

  @IsString()
  @IsNotEmpty()
  fechaEntrega!: string; 
}