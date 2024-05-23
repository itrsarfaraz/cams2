import { Test, TestingModule } from '@nestjs/testing';
import { WlcCapitalCostsService } from './wlc_capital_costs.service';

describe('WlcCapitalCostsService', () => {
  let service: WlcCapitalCostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WlcCapitalCostsService],
    }).compile();

    service = module.get<WlcCapitalCostsService>(WlcCapitalCostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
