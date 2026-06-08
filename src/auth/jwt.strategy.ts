import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Le decimos que busque el token en la cabecera de la petición
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // DEBE ser la misma palabra secreta que pusimos en el auth.module
      secretOrKey: 'PALABRA_SECRETA_SUPER_SEGURA', 
    });
  }

  // Si el token es válido, extrae los datos del usuario para usarlos
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, rol: payload.rol };
  }
}