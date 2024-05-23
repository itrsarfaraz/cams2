import { Test, TestingModule } from '@nestjs/testing';
import { ComponentFailureRatesController } from './component_failure_rates.controller';
import { ComponentFailureRatesService } from './component_failure_rates.service';

describe('ComponentFailureRatesController', () => {
  let controller: ComponentFailureRatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentFailureRatesController],
      providers: [ComponentFailureRatesService],
    }).compile();

    controller = module.get<ComponentFailureRatesController>(ComponentFailureRatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
