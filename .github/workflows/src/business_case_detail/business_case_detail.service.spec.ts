import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCaseDetailService } from './business_case_detail.service';

describe('BusinessCaseDetailService', () => {
  let service: BusinessCaseDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessCaseDetailService],
    }).compile();

    service = module.get<BusinessCaseDetailService>(BusinessCaseDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
