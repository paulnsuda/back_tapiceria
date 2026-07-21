import { Controller, Get, Post, Body } from '@nestjs/common';
import { ServiciosBaseService } from './servicios-base.service';
import { ServicioBase } from './entities/servicios-base.entity';

@Controller('servicios-base')
export class ServiciosBaseController {
  constructor(private readonly serviciosBaseService: ServiciosBaseService) {}

  @Post()
  create(@Body() servicio: ServicioBase) {
    return this.serviciosBaseService.create(servicio);
  }

  @Get()
  findAll() {
    return this.serviciosBaseService.findAll();
  }
}