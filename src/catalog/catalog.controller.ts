import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  // 🔒 PRIVADO: Solo el Dueño puede subir fotos al catálogo
  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() createCatalogDto: CreateCatalogDto) {
    return this.catalogService.create(createCatalogDto);
  }

  // 🌍 PÚBLICO: Cualquier persona en el mundo puede ver las fotos (Sin Guards)
  @Get()
  findAll() {
    return this.catalogService.findAll();
  }

  // 🔒 PRIVADO: Solo el Dueño puede borrar fotos
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  remove(@Param('id') id: string) {
    return this.catalogService.remove(+id);
  }
}