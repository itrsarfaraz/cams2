import { Test, TestingModule } from '@nestjs/testing';
import { AssetFinanceService } from './asset_finance.service';

describe('AssetFinanceService', () => {
  let service: AssetFinanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetFinanceService],
    }).compile();

    service = module.get<AssetFinanceService>(AssetFinanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
