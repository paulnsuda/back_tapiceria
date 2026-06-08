import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule, // Para buscar usuarios
    PassportModule,
    JwtModule.register({
      secret: 'PALABRA_SECRETA_SUPER_SEGURA', // En producción usa variables de entorno
      signOptions: { expiresIn: '8h' }, // El token dura 8 horas
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}