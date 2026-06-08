import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  // 1. Registrar un nuevo pago/anticipo
  async create(createPaymentDto: CreatePaymentDto) {
    const nuevoPago = this.paymentRepository.create(createPaymentDto);
    return this.paymentRepository.save(nuevoPago);
  }

  // 2. Ver absolutamente todos los pagos del negocio (Auditoría del dueño)
  findAll() {
    return this.paymentRepository.find({ order: { fechaPago: 'DESC' } });
  }

  // 3. 🔥 FUNCIÓN CLAVE: Buscar todos los pagos de un trabajo en específico
  async findByJob(jobId: number) {
    const pagos = await this.paymentRepository.findBy({ jobId });
    
    // Calculamos el total que ha abonado sumando todos sus pagos
    const totalAbonado = pagos.reduce((sum, pago) => sum + Number(pago.monto), 0);

    return {
      jobId,
      totalAbonado,
      historial: pagos,
    };
  }

  // 4. Eliminar un pago por si te equivocaste al digitarlo
  remove(id: number) {
    return this.paymentRepository.delete(id);
  }
}