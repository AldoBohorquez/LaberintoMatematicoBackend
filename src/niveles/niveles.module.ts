import { Module,OnModuleInit } from '@nestjs/common';
import { NivelesService } from './niveles.service';
import { NivelesController } from './niveles.controller';

@Module({
  providers: [NivelesService],
  controllers: [NivelesController],
  exports: [NivelesService,NivelesModule]
})
export class NivelesModule{
}
