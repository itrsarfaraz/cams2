import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCaseIntendTenureService } from './business_case_intend_tenure.service';

describe('BusinessCaseIntendTenureService', () => {
  let service: BusinessCaseIntendTenureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessCaseIntendTenureService],
    }).compile();

    service = module.get<BusinessCaseIntendTenureService>(BusinessCaseIntendTenureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
