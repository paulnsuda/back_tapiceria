import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Job, JobStatus } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto) {
    const nuevoTrabajo = this.jobRepository.create(createJobDto);
    return this.jobRepository.save(nuevoTrabajo);
  }

  findAll() {
    return this.jobRepository.find({ order: { fechaEntrega: 'ASC' } });
  }

  async findOne(id: number) {
    const trabajo = await this.jobRepository.findOneBy({ id });
    if (!trabajo) throw new NotFoundException('El trabajo no existe');
    return trabajo;
  }

  async update(id: number, updateJobDto: UpdateJobDto) {
    await this.findOne(id); // Verifica si existe
    return this.jobRepository.update(id, updateJobDto);
  }

  remove(id: number) {
    return this.jobRepository.delete(id);
  }

  // 🔥 FUNCIÓN ESPECIAL PARA LA ALERTA DE LA PRÓXIMA SEMANA
  async obtenerAlertasAgenda() {
    const hoy = new Date();
    
    const proximaSemana = new Date();
    proximaSemana.setDate(hoy.getDate() + 7);

    // Formateamos las fechas a YYYY-MM-DD para comparar con la DB
    const formatoFecha = (d: Date) => d.toISOString().split('T')[0];

    return this.jobRepository.find({
      where: {
        fechaEntrega: Between(formatoFecha(hoy), formatoFecha(proximaSemana)),
        estado: JobStatus.EN_PROCESO, // Solo los que siguen en taller
      },
      order: { fechaEntrega: 'ASC' }
    });
  }
}