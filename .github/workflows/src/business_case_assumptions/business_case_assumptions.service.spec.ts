import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCaseAssumptionsService } from './business_case_assumptions.service';

describe('BusinessCaseAssumptionsService', () => {
  let service: BusinessCaseAssumptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessCaseAssumptionsService],
    }).compile();

    service = module.get<BusinessCaseAssumptionsService>(BusinessCaseAssumptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
