import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProformasService } from './proformas.service';
import { ProformasController } from './proformas.controller';
import { Proforma } from './entities/proforma.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proforma])], // Conectamos la tabla
  controllers: [ProformasController],
  providers: [ProformasService],
})
export class ProformasModule {}