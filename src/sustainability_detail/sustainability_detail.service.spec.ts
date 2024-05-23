import { Test, TestingModule } from '@nestjs/testing';
import { SustainabilityDetailService } from './sustainability_detail.service';

describe('SustainabilityDetailService', () => {
  let service: SustainabilityDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SustainabilityDetailService],
    }).compile();

    service = module.get<SustainabilityDetailService>(SustainabilityDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
