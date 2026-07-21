import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Job } from './entities/job.entity';
import { JobMaterial } from './entities/job-material.entity';
import { Material } from '../materials/entities/material.entity';
import { TrackController } from './track.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Job, JobMaterial, Material])], 
  controllers: [JobsController, TrackController],
  providers: [JobsService],
  
  // 👇 SOLO AGREGA ESTA LÍNEA 👇
  exports: [JobsService], 
})
export class JobsModule {}