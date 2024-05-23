import { Test, TestingModule } from '@nestjs/testing';
import { SustainabilityDetailController } from './sustainability_detail.controller';
import { SustainabilityDetailService } from './sustainability_detail.service';

describe('SustainabilityDetailController', () => {
  let controller: SustainabilityDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SustainabilityDetailController],
      providers: [SustainabilityDetailService],
    }).compile();

    controller = module.get<SustainabilityDetailController>(SustainabilityDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
