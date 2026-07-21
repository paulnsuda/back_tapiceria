import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // <-- 1. Importamos ConfigModule
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MaterialsModule } from './materials/materials.module';
import { ProformasModule } from './proformas/proformas.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './jobs/jobs.module';
import { PaymentsModule } from './payments/payments.module';
import { CatalogModule } from './catalog/catalog.module';
import { GalleryModule } from './gallery/gallery.module';
import { ServiciosBaseModule } from './servicios-base/servicios-base.module';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [
    // 2. Iniciamos el lector del archivo .env para que esté disponible en toda la app
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

    // 3. Conectamos TypeORM usando forRootAsync para leer la URL desde el .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'), // Lee el link de Neon
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Ojo: cuando ya la subas a producción oficial, es mejor pasar esto a false
        ssl: true, // 4. Neon requiere SSL obligatorio
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
    }),
    
    // Tus otros módulos se quedan intactos
    MaterialsModule,
    ProformasModule,
    UsersModule,
    AuthModule,
    JobsModule,
    PaymentsModule,
    CatalogModule,
    GalleryModule,
    ServiciosBaseModule,
    LogsModule,
  ],
  controllers: [AppController], // Asumiendo que tenías esto
  providers: [AppService],      // Asumiendo que tenías esto
})
export class AppModule {}