import { Test, TestingModule } from '@nestjs/testing';
import { PuntuacionesController } from './puntuaciones.controller';

describe('PuntuacionesController', () => {
  let controller: PuntuacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PuntuacionesController],
    }).compile();

    controller = module.get<PuntuacionesController>(PuntuacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
