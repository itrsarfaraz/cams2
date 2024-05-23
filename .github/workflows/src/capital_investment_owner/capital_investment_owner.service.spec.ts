import { Test, TestingModule } from '@nestjs/testing';
import { CapitalInvestmentOwnerService } from './capital_investment_owner.service';

describe('CapitalInvestmentOwnerService', () => {
  let service: CapitalInvestmentOwnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CapitalInvestmentOwnerService],
    }).compile();

    service = module.get<CapitalInvestmentOwnerService>(CapitalInvestmentOwnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
