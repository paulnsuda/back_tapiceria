import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @Roles(UserRole.ADMIN) // Solo el dueño crea trabajos
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  @Roles(UserRole.ADMIN) // Solo el dueño ve la lista completa de la agenda
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findAll() {
    return this.jobsService.findAll();
  }

  // 🔥 RUTA DE ALERTAS EXCLUSIVA PARA EL DUEÑO
  @Get('alertas')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getAlerts() {
    return this.jobsService.obtenerAlertasAgenda();
  }

  // 🌍 RUTA PÚBLICA: El cliente puede consultar ingresando solo el ID de su orden
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN) // Solo el dueño cambia el estado (ej: de pendiente a en_proceso)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}