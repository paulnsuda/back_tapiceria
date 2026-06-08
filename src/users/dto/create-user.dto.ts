import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsEmail({}, { message: 'El correo debe ser válido' })
  email!: string; // <-- Aquí agregamos el !

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password!: string; // <-- Aquí agregamos el !

  @IsOptional()
  @IsEnum(UserRole)
  rol?: UserRole;
}