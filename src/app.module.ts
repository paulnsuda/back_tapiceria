import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MaterialsModule } from './materials/materials.module';
import { ProformasModule } from './proformas/proformas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './jobs/jobs.module';
import { PaymentsModule } from './payments/payments.module';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // O el host de tu base de datos
      port: 5432,
      username: 'postgres', 
      password: '0980993908P', 
      database: 'tapiceria_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Esto crea las tablas automáticamente (solo en desarrollo)
    }),
    MaterialsModule,
    ProformasModule,
    UsersModule,
    AuthModule,
    JobsModule,
    PaymentsModule,
    CatalogModule,
  ],
})
export class AppModule {}