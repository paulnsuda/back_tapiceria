import { IsNumber, IsNotEmpty, IsEnum, IsOptional, IsString, Min } from 'class-validator';
import { PaymentType } from '../entities/payment.entity';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  jobId!: number;

  @IsNumber()
  @Min(0.01, { message: 'El monto debe ser mayor a 0' })
  monto!: number;

  @IsEnum(PaymentType)
  @IsNotEmpty()
  tipoPago!: PaymentType;

  @IsString()
  @IsOptional()
  notas?: string;
}