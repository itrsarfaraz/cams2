import { Test, TestingModule } from '@nestjs/testing';
import { AssetOperationalCostsService } from './asset_operational_costs.service';

describe('AssetOperationalCostsService', () => {
  let service: AssetOperationalCostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetOperationalCostsService],
    }).compile();

    service = module.get<AssetOperationalCostsService>(AssetOperationalCostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
