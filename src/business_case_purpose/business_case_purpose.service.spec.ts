import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCasePurposeService } from './business_case_purpose.service';

describe('BusinessCasePurposeService', () => {
  let service: BusinessCasePurposeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessCasePurposeService],
    }).compile();

    service = module.get<BusinessCasePurposeService>(BusinessCasePurposeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
