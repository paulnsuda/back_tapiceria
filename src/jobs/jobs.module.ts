import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Job } from './entities/job.entity';
import { JobMaterial } from './entities/job-material.entity'; // <-- Importas esto
import { Material } from '../materials/entities/material.entity'; // <-- Y esto
import { TrackController } from './track.controller'; // <-- Importas el TrackController

@Module({
  // Agregas JobMaterial y Material al arreglo
  imports: [TypeOrmModule.forFeature([Job, JobMaterial, Material])], 
  controllers: [JobsController, TrackController],
  providers: [JobsService],
})
export class JobsModule {}