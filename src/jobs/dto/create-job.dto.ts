import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
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

  @IsOptional()
  @IsEnum(JobStatus)
  estado?: JobStatus;

  @IsString()
  @IsNotEmpty()
  fechaEntrega!: string; // Formato YYYY-MM-DD
}