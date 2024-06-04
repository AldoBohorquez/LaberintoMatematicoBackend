import { Module } from '@nestjs/common';
import { EjerciciosService } from './ejercicios.service';
import { EjerciciosController } from './ejercicios.controller';

@Module({
  providers: [EjerciciosService],
  controllers: [EjerciciosController]
})
export class EjerciciosModule {}
