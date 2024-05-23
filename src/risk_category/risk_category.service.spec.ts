import { Test, TestingModule } from '@nestjs/testing';
import { RiskCategoryService } from './risk_category.service';

describe('RiskCategoryService', () => {
  let service: RiskCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiskCategoryService],
    }).compile();

    service = module.get<RiskCategoryService>(RiskCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
