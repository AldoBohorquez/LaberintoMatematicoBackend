import { Module } from '@nestjs/common';
import { SalasService } from './salas.service';
import { SalasController } from './salas.controller';

@Module({
  providers: [SalasService],
  controllers: [SalasController]
})
export class SalasModule {}
