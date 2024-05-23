import { Test, TestingModule } from '@nestjs/testing';
import { AssetRiskService } from './asset_risk.service';

describe('AssetRiskService', () => {
  let service: AssetRiskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetRiskService],
    }).compile();

    service = module.get<AssetRiskService>(AssetRiskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
