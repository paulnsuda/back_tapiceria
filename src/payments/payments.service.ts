import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Job } from '../jobs/entities/job.entity'; 

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const job = await this.jobRepository.findOne({ 
      where: { id: createPaymentDto.jobId } 
    });

    if (!job) {
      throw new NotFoundException(`Error: No se puede cobrar. El trabajo con ID ${createPaymentDto.jobId} no existe.`);
    }

    const nuevoPago = this.paymentRepository.create(createPaymentDto);
    return this.paymentRepository.save(nuevoPago);
  }

  findAll() {
    return this.paymentRepository.find({ 
      order: { fechaPago: 'DESC' },
      relations: ['job'] 
    });
  }

  async findByJob(jobId: number) {
    // Buscamos los pagos ordenados por fecha
    const pagos = await this.paymentRepository.find({ 
      where: { jobId },
      order: { fechaPago: 'DESC' }
    });
    
    // Calculamos el total abonado
    const totalAbonado = pagos.reduce((sum, pago) => sum + Number(pago.monto), 0);

    return {
      jobId,
      totalAbonado,
      historial: pagos,
    };
  }

  async remove(id: number) {
    const resultado = await this.paymentRepository.delete(id);
    
    if (resultado.affected === 0) {
      throw new NotFoundException(`El pago con ID ${id} no fue encontrado.`);
    }
    
    return { mensaje: 'Pago eliminado correctamente del sistema' };
  }
}