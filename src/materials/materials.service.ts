import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './entities/material.entity';
import { CreateMaterialDto } from './dto/create-material.dto';
// Nota: NestJS crea un UpdateMaterialDto automáticamente en la carpeta dto
import { UpdateMaterialDto } from './dto/update-material.dto'; 

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
  ) {}

  // 1. Crear un nuevo material en la Base de Datos
  create(createMaterialDto: CreateMaterialDto) {
    const nuevoMaterial = this.materialRepository.create(createMaterialDto);
    return this.materialRepository.save(nuevoMaterial);
  }

  // 2. Obtener todos los materiales
  findAll() {
    return this.materialRepository.find();
  }

  // 3. Obtener un solo material por su ID
  findOne(id: number) {
    return this.materialRepository.findOneBy({ id });
  }

  // 4. Actualizar un material (ej: si cambia el precio del cuero)
  update(id: number, updateMaterialDto: UpdateMaterialDto) {
    return this.materialRepository.update(id, updateMaterialDto);
  }

  // 5. Borrar un material
  remove(id: number) {
    return this.materialRepository.delete(id);
  }

  // 6. Tu función especial para calcular presupuestos
  calcularPresupuesto(listaMateriales: any[], porcentajeGanancia: number) {
    const costoBase = listaMateriales.reduce((acc, item) => {
      return acc + (item.precio * item.cantidad);
    }, 0);

    const ganancia = costoBase * (porcentajeGanancia / 100);
    const total = costoBase + ganancia;

    return { costoBase, ganancia, total };
  }
}