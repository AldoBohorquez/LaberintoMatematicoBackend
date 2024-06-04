import { Module } from '@nestjs/common';
import { NivelesService } from './niveles.service';
import { NivelesController } from './niveles.controller';

@Module({
  providers: [NivelesService],
  controllers: [NivelesController]
})
export class NivelesModule {}
