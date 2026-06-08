import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1. Importamos TypeORM
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import { Material } from './entities/material.entity'; // 2. Importamos tu entidad

@Module({
  // 3. AQUÍ ESTÁ LA MAGIA: Le decimos al módulo que registre la tabla Material
  imports: [TypeOrmModule.forFeature([Material])], 
  controllers: [MaterialsController],
  providers: [MaterialsService],
})
export class MaterialsModule {}