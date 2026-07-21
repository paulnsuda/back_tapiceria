import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './entities/log.entity';


@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log)
    private logsRepository: Repository<Log>,
  ) {}

  // Esta función es la que usaremos desde otros lugares para grabar lo que pasa
  async createLog(accion: string, modulo: string, descripcion: string, usuario: string = 'Admin') {
    const nuevoLog = this.logsRepository.create({
      accion,
      modulo,
      descripcion,
      usuario
    });
    // Guardamos silenciosamente en la base de datos
    return this.logsRepository.save(nuevoLog);
  }

  // Esta función la usaremos en el Frontend para mostrar la tabla al profesor
  findAll() {
    return this.logsRepository.find({ order: { fecha: 'DESC' } }); // Los más recientes primero
  }
}