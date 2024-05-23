import { Test, TestingModule } from '@nestjs/testing';
import { AssetCapitalInvestmentService } from './asset_capital_investment.service';

describe('AssetCapitalInvestmentService', () => {
  let service: AssetCapitalInvestmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetCapitalInvestmentService],
    }).compile();

    service = module.get<AssetCapitalInvestmentService>(AssetCapitalInvestmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
