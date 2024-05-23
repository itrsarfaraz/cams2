import { Test, TestingModule } from '@nestjs/testing';
import { ComponentFailureRatesService } from './component_failure_rates.service';

describe('ComponentFailureRatesService', () => {
  let service: ComponentFailureRatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComponentFailureRatesService],
    }).compile();

    service = module.get<ComponentFailureRatesService>(ComponentFailureRatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
