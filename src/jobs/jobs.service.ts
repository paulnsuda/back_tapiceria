import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Not, In } from 'typeorm';
import { Job, JobStatus } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Material } from '../materials/entities/material.entity'; // Inyectamos Material
import { JobMaterial } from './entities/job-material.entity'; // Inyectamos la tabla intermedia
import { LogsService } from '../logs/logs.service';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    
    // Traemos los repositorios para manejar el inventario
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
    
    @InjectRepository(JobMaterial)
    private jobMaterialRepository: Repository<JobMaterial>,
    private logsService: LogsService,
  ) {}

  async create(createJobDto: CreateJobDto) {
    const nuevoTrabajo = this.jobRepository.create(createJobDto);

    await this.logsService.createLog(
      'CREAR',
      'Trabajos',
      `Se creó un nuevo trabajo para el vehículo ${nuevoTrabajo.placaVehiculo} (Cliente: ${nuevoTrabajo.clienteNombre})`
    );

    return this.jobRepository.save(nuevoTrabajo);
  }

  // Al traer todos los trabajos, pedimos que también nos traiga la lista de materiales usados
  findAll() {
    return this.jobRepository.find({ 
      order: { fechaEntrega: 'ASC' },
      relations: ['materialesUsados', 'materialesUsados.material'] 
    });
  }

  async findOne(id: number) {
    const trabajo = await this.jobRepository.findOne({
      where: { id },
      relations: ['materialesUsados', 'materialesUsados.material', 'pagos']
    });
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

  // 🔥 FUNCIÓN MÁGICA: Agregar material a un carro y descontar inventario
  async agregarMaterialAlTrabajo(jobId: number, materialId: number, cantidadUsada: number) {
    // 1. Buscamos el trabajo y el material
    const job = await this.jobRepository.findOneBy({ id: jobId });
    if (!job) throw new NotFoundException('Trabajo no encontrado');

    const material = await this.materialRepository.findOneBy({ id: materialId });
    if (!material) throw new NotFoundException('Material no encontrado');

    // 2. Validamos que tengamos suficiente material físico en el taller
    if (material.stock < cantidadUsada) {
      throw new BadRequestException(`No hay suficiente stock de ${material.nombre}. Stock actual: ${material.stock} ${material.unidadMedida}`);
    }

    // 3. Creamos el registro indicando que este carro usó este material a este precio
    const nuevoJobMaterial = this.jobMaterialRepository.create({
      jobId: job.id,
      materialId: material.id,
      cantidadUsada: cantidadUsada,
      precioUnitarioHistorico: material.precioUnitario,
    });

    // 4. 📉 DESCONTAMOS EL STOCK DEL INVENTARIO
    material.stock -= cantidadUsada;
    await this.materialRepository.save(material);

    // 5. 💰 SUMAMOS EL COSTO AL TRABAJO AUTOMÁTICAMENTE
    const costoDeEsteMaterial = cantidadUsada * Number(material.precioUnitario);
    job.costoTotal = Number(job.costoTotal) + costoDeEsteMaterial;
    await this.jobRepository.save(job);

    // 6. Guardamos el historial del uso
    return this.jobMaterialRepository.save(nuevoJobMaterial);
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
        // Trae los autos que NO están listos o entregados (usando el nuevo enum)
        estado: Not(In([JobStatus.LISTO, JobStatus.ENTREGADO])), 
      },
      order: { fechaEntrega: 'ASC' }
    });
  }


// Buscar un trabajo por la placa del vehículo (Público)
async findByPlaca(placaVehiculo: string) {
    // 1. Limpiamos lo que el usuario escribió: dejamos SOLO letras y números en mayúsculas
    // Ejemplo: Si el cliente escribe "ub j-975", esto lo convierte en "UBJ975"
    const placaLimpia = placaVehiculo.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    // 2. Le decimos a la base de datos que también "limpie" temporalmente sus registros
    // para compararlos con la placa limpia, quitando guiones y espacios.
    const job = await this.jobRepository.createQueryBuilder('job')
      .where("REPLACE(REPLACE(UPPER(job.placaVehiculo), '-', ''), ' ', '') = :placaLimpia", { placaLimpia })
      .orderBy('job.id', 'DESC')
      .getOne();
    
    if (!job) {
      throw new NotFoundException(`No se encontró ningún vehículo con la placa ${placaVehiculo}`);
    }
    
    return job;
  }

}