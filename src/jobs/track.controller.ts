import { Controller, Get, Param } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('track') // Define la ruta pública /track
export class TrackController {
  constructor(private readonly jobsService: JobsService) {}

  @Get(':placa')
  rastrearVehiculo(@Param('placa') placa: string) {
    return this.jobsService.findByPlaca(placa);
  }
}