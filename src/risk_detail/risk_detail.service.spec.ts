import { Test, TestingModule } from '@nestjs/testing';
import { RiskDetailService } from './risk_detail.service';

describe('RiskDetailService', () => {
  let service: RiskDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiskDetailService],
    }).compile();

    service = module.get<RiskDetailService>(RiskDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
