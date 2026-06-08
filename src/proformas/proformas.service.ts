import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proforma } from './entities/proforma.entity';
import { CreateProformaDto } from './dto/create-proforma.dto';

@Injectable()
export class ProformasService {
  constructor(
    @InjectRepository(Proforma)
    private proformaRepository: Repository<Proforma>,
  ) {}

  async create(createProformaDto: CreateProformaDto) {
    const { materialesUsados, porcentajeGanancia } = createProformaDto;

    // 1. Calculamos automáticamente el costo base sumando: (precio * cantidad) de cada material
    const costoBase = materialesUsados.reduce((sum, mat) => {
      return sum + (Number(mat.precioUnitario) * Number(mat.cantidad));
    }, 0);

    // 2. Aplicamos la fórmula del porcentaje de ganancia
    const margenGanancia = costoBase * (porcentajeGanancia / 100);
    const precioFinal = costoBase + margenGanancia;

    // 3. Creamos el registro con los cálculos automáticos del backend
    const nuevaProforma = this.proformaRepository.create({
      ...createProformaDto,
      costoBaseMateriales: costoBase,
      precioFinalCliente: precioFinal,
    });

    // 4. Guardamos en PostgreSQL
    return this.proformaRepository.save(nuevaProforma);
  }

  findAll() {
    return this.proformaRepository.find({ order: { fechaCreacion: 'DESC' } });
  }

  findOne(id: number) {
    return this.proformaRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.proformaRepository.delete(id);
  }
}