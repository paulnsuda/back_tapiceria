import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Catalog } from './entities/catalog.entity';
import { CreateCatalogDto } from './dto/create-catalog.dto';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Catalog)
    private catalogRepository: Repository<Catalog>,
  ) {}

  create(createCatalogDto: CreateCatalogDto) {
    const nuevoItem = this.catalogRepository.create(createCatalogDto);
    return this.catalogRepository.save(nuevoItem);
  }

  // Las fotos más nuevas saldrán primero
  findAll() {
    return this.catalogRepository.find({ order: { fechaPublicacion: 'DESC' } });
  }

  remove(id: number) {
    return this.catalogRepository.delete(id);
  }
}