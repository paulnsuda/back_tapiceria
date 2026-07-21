import { Test, TestingModule } from '@nestjs/testing';
import { ServiciosBaseService } from './servicios-base.service';

describe('ServiciosBaseService', () => {
  let service: ServiciosBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiciosBaseService],
    }).compile();

    service = module.get<ServiciosBaseService>(ServiciosBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
