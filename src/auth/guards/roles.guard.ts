import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../../users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Conseguir el rol requerido por la ruta
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    // Si la ruta no tiene la etiqueta @Roles, cualquiera con token puede pasar
    if (!requiredRoles) {
      return true;
    }

    // 2. Obtener el usuario desde la petición (inyectado por el JwtStrategy)
    const { user } = context.switchToHttp().getRequest();
    
    // 3. Comprobar si el rol del usuario coincide con los permitidos
    const tieneRol = requiredRoles.includes(user.rol);
    
    if (!tieneRol) {
      throw new ForbiddenException('No tienes permisos (Rol insuficiente) para realizar esta acción');
    }

    return true;
  }
}