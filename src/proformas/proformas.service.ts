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
    // Le damos valor por defecto al arreglo de materiales por si viene vacío
    const { materialesUsados = [] } = createProformaDto;

    // 1. Calculamos el costo base sumando: (precio * cantidad) de los materiales
    // Esto se guarda solo para tu control interno de costos.
    const costoBase = materialesUsados.reduce((sum, mat) => {
      return sum + (Number(mat.precioUnitario) * Number(mat.cantidad));
    }, 0);

    // 2. Creamos el registro. 
    // Al usar "...createProformaDto", Angular incrustará automáticamente 
    // los $680 en el subtotal, precioEstimado y precioFinal.
    const nuevaProforma = this.proformaRepository.create({
      ...createProformaDto,
      costoBaseMateriales: costoBase,
    });

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

  update(id: number, updateProformaDto: Partial<CreateProformaDto>) {
    return this.proformaRepository.update(id, updateProformaDto);
  }
}