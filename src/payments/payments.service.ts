import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Job } from '../jobs/entities/job.entity'; // Importamos la entidad Job para validar

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    
    // Inyectamos el repositorio de Job para poder verificar que el trabajo exista
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  // 1. Registrar un nuevo pago/anticipo
  async create(createPaymentDto: CreatePaymentDto) {
    // Seguridad financiera: Verificamos que el trabajo exista antes de registrarle dinero
    const job = await this.jobRepository.findOne({ 
      where: { id: createPaymentDto.jobId } 
    });

    if (!job) {
      throw new NotFoundException(`Error: No se puede cobrar. El trabajo con ID ${createPaymentDto.jobId} no existe.`);
    }

    const nuevoPago = this.paymentRepository.create(createPaymentDto);
    return this.paymentRepository.save(nuevoPago);
  }

  // 2. Ver absolutamente todos los pagos del negocio (Auditoría del dueño)
  findAll() {
    // Le agregué la relación con 'job' para que en tu auditoría veas a qué trabajo pertenece cada pago
    return this.paymentRepository.find({ 
      order: { fechaPago: 'DESC' },
      relations: ['job'] 
    });
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
  async remove(id: number) {
    const resultado = await this.paymentRepository.delete(id);
    
    if (resultado.affected === 0) {
      throw new NotFoundException(`El pago con ID ${id} no fue encontrado.`);
    }
    
    return { mensaje: 'Pago eliminado correctamente del sistema' };
  }
}