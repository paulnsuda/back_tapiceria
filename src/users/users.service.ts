import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs'; // <-- Importamos la librería

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Función para crear un usuario (Dueño o Cliente)
  async create(createUserDto: CreateUserDto) {
    // 1. Generamos un "salt" (un valor aleatorio para hacer la clave más segura)
    const salt = await bcrypt.genSalt(10);
    
    // 2. Mezclamos la contraseña real con el salt para encriptarla
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    // 3. Preparamos el usuario para guardarlo, reemplazando la contraseña
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // 4. Lo guardamos en PostgreSQL
    return this.userRepository.save(newUser);
  }

  // Las funciones CRUD básicas que NestJS necesita
  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async findOneByEmail(email: string) {
  return this.userRepository.findOneBy({ email });
}

}