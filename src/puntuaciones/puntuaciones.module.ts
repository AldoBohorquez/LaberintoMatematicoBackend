import { Module } from '@nestjs/common';
import { PuntuacionesService } from './puntuaciones.service';
import { PuntuacionesController } from './puntuaciones.controller';

@Module({
  providers: [PuntuacionesService],
  controllers: [PuntuacionesController]
})
export class PuntuacionesModule {}
