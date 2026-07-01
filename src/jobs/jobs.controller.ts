import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { AddMaterialToJobDto } from './dto/add-material.dto'; // Importamos el nuevo DTO

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  // 🔥 RUTA ESPECIAL: Alertas de agenda (Debe ir ANTES del :id para que NestJS no se confunda)
  @Get('alertas/agenda')
  obtenerAlertas() {
    return this.jobsService.obtenerAlertasAgenda();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }

  // 🔥 NUEVO ENDPOINT: Agregar material y descontar inventario
  // Ejemplo de uso desde Angular: POST http://localhost:3000/jobs/5/materials
  @Post(':id/materials')
  agregarMaterial(
    @Param('id') jobId: string, 
    @Body() addMaterialDto: AddMaterialToJobDto
  ) {
    return this.jobsService.agregarMaterialAlTrabajo(
      +jobId, 
      addMaterialDto.materialId, 
      addMaterialDto.cantidadUsada
    );
  }
}