import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { Gallery } from './entities/gallery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gallery])], // <-- Conectamos la tabla aquí
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}