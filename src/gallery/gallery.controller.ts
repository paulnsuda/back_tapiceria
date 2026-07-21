import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  // RUTA PÚBLICA: Cualquier persona en el Home puede ver el catálogo
  @Get()
  findAll() {
    return this.galleryService.findAll();
  }

  // RUTA PRIVADA: Solo el administrador puede subir fotos nuevas
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createGalleryDto: { titulo: string; url: string }) {
    return this.galleryService.create(createGalleryDto);
  }

  // RUTA PRIVADA: Solo el administrador puede borrar fotos
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galleryService.remove(+id);
  }
}