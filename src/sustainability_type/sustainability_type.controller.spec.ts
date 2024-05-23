import { Test, TestingModule } from '@nestjs/testing';
import { SustainabilityTypeController } from './sustainability_type.controller';
import { SustainabilityTypeService } from './sustainability_type.service';

describe('SustainabilityTypeController', () => {
  let controller: SustainabilityTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SustainabilityTypeController],
      providers: [SustainabilityTypeService],
    }).compile();

    controller = module.get<SustainabilityTypeController>(SustainabilityTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
