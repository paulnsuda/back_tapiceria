import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { Log } from './entities/log.entity';

@Global() // <--- MAGIA: Esto permite usar el LogsService en cualquier parte de tu app
@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  controllers: [LogsController],
  providers: [LogsService],
  exports: [LogsService], // Lo exportamos para que los otros módulos lo puedan usar
})
export class LogsModule {}