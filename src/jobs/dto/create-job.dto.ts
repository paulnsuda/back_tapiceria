import { IsString, IsNotEmpty, IsNumber, Min, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { JobStatus } from '../entities/job.entity';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  clienteNombre!: string;

  @IsString()
  @IsNotEmpty()
  placaVehiculo!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  costoTotal?: number;

  @IsEnum(JobStatus)
  @IsOptional()
  estado?: JobStatus;

  @IsDateString()
  @IsOptional()
  fechaEntrega?: string; // Formato YYYY-MM-DD
}