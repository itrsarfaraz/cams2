import { Test, TestingModule } from '@nestjs/testing';
import { SustainabilityTypeService } from './sustainability_type.service';

describe('SustainabilityTypeService', () => {
  let service: SustainabilityTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SustainabilityTypeService],
    }).compile();

    service = module.get<SustainabilityTypeService>(SustainabilityTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
