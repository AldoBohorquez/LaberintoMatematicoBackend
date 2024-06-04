import { Test, TestingModule } from '@nestjs/testing';
import { PuntuacionesService } from './puntuaciones.service';

describe('PuntuacionesService', () => {
  let service: PuntuacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PuntuacionesService],
    }).compile();

    service = module.get<PuntuacionesService>(PuntuacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
