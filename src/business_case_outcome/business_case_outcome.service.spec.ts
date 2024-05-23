import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCaseOutcomeService } from './business_case_outcome.service';

describe('BusinessCaseOutcomeService', () => {
  let service: BusinessCaseOutcomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessCaseOutcomeService],
    }).compile();

    service = module.get<BusinessCaseOutcomeService>(BusinessCaseOutcomeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
