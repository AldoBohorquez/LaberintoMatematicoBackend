import { Module } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { GruposController } from './grupos.controller';

@Module({
  providers: [GruposService],
  controllers: [GruposController]
})
export class GruposModule {}
