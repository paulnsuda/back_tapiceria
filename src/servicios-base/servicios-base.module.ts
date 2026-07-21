import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiciosBaseService } from './servicios-base.service';
import { ServiciosBaseController } from './servicios-base.controller';

// Importamos la entidad. Por la pestaña que veo en tu foto, el archivo se llama así:
import { ServicioBase } from './entities/servicios-base.entity';
@Module({
  imports: [TypeOrmModule.forFeature([ServicioBase])],
  controllers: [ServiciosBaseController],
  providers: [ServiciosBaseService],
})
export class ServiciosBaseModule {}