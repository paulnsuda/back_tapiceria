import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // 1. Buscar si el usuario existe
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    // 2. Comparar la contraseña escrita con la encriptada en la DB
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    // 3. Si todo está bien, creamos el "paquete" de datos para el Token
    const payload = { 
      email: user.email, 
      sub: user.id, 
      rol: user.rol 
    };

    // 4. Devolvemos el Token generado
    return {
      user: {
        email: user.email,
        rol: user.rol,
      },
      access_token: this.jwtService.sign(payload),
    };
  }
}