import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gallery } from './entities/gallery.entity';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private galleryRepository: Repository<Gallery>,
  ) {}

  // Guardar una nueva foto
  create(createGalleryDto: any) {
    const nuevaFoto = this.galleryRepository.create(createGalleryDto);
    return this.galleryRepository.save(nuevaFoto);
  }

  // Traer todas las fotos (Para mostrarlas en el Home)
  findAll() {
    return this.galleryRepository.find({ order: { id: 'DESC' } });
  }

  // Eliminar una foto si ya no la quieres en el catálogo
  async remove(id: number) {
    const foto = await this.galleryRepository.findOne({ where: { id } });
    if (!foto) {
      throw new NotFoundException('Foto no encontrada');
    }
    return this.galleryRepository.remove(foto);
  }
}