import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicioBase } from './entities/servicios-base.entity';
@Injectable()
export class ServiciosBaseService {
  constructor(
    @InjectRepository(ServicioBase)
    private servicioRepository: Repository<ServicioBase>,
  ) {}

  create(servicio: ServicioBase) {
    return this.servicioRepository.save(servicio); // Guarda en PostgreSQL
  }

  findAll() {
    // AQUÍ ESTABA EL TEXTO ESCONDIDO. Ahora sí buscará en la base de datos:
    return this.servicioRepository.find({ where: { activo: true } }); 
  }
}