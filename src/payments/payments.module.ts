import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment } from './entities/payment.entity';
import { Job } from '../jobs/entities/job.entity'; // Asegúrate de importar Job aquí también

@Module({
  // ¡Esta es la línea clave! Deben estar [Payment, Job]
  imports: [TypeOrmModule.forFeature([Payment, Job])], 
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}