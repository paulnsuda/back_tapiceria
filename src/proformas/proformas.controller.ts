import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ProformasService } from './proformas.service';
import { CreateProformaDto } from './dto/create-proforma.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('proformas')
@Roles(UserRole.ADMIN) // <-- ¡BLOQUEADO! Solo el administrador (dueño) tiene acceso a TODO este controlador
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ProformasController {
  constructor(private readonly proformasService: ProformasService) {}

  @Post()
  create(@Body() createProformaDto: CreateProformaDto) {
    return this.proformasService.create(createProformaDto);
  }

  @Get()
  findAll() {
    return this.proformasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proformasService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proformasService.remove(+id);
  }
}