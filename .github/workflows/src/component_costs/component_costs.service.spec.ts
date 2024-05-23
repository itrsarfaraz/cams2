import { Test, TestingModule } from '@nestjs/testing';
import { ComponentCostsService } from './component_costs.service';

describe('ComponentCostsService', () => {
  let service: ComponentCostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComponentCostsService],
    }).compile();

    service = module.get<ComponentCostsService>(ComponentCostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
