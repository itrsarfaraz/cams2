import { Test, TestingModule } from '@nestjs/testing';
import { SustainabilityCategoryService } from './sustainability_category.service';

describe('SustainabilityCategoryService', () => {
  let service: SustainabilityCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SustainabilityCategoryService],
    }).compile();

    service = module.get<SustainabilityCategoryService>(SustainabilityCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
