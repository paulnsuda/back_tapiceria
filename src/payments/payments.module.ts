import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment } from './entities/payment.entity';
import { Job } from '../jobs/entities/job.entity'; // <-- 1. Importamos la entidad Job

@Module({
  // 2. Le decimos a TypeORM que este módulo usará ambas entidades
  imports: [TypeOrmModule.forFeature([Payment, Job])], 
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}