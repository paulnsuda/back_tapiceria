import { Test, TestingModule } from '@nestjs/testing';
import { ServiciosBaseController } from './servicios-base.controller';
import { ServiciosBaseService } from './servicios-base.service';

describe('ServiciosBaseController', () => {
  let controller: ServiciosBaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiciosBaseController],
      providers: [ServiciosBaseService],
    }).compile();

    controller = module.get<ServiciosBaseController>(ServiciosBaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
