import { Controller, Get } from '@nestjs/common';
import { LogsService } from './logs.service';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  // Cuando Angular llame a http://localhost:3000/logs, le mandamos el historial
  @Get()
  findAll() {
    return this.logsService.findAll();
  }
}