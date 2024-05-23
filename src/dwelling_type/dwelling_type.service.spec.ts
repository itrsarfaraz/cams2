import { Test, TestingModule } from '@nestjs/testing';
import { DwellingTypeService } from './dwelling_type.service';

describe('DwellingTypeService', () => {
  let service: DwellingTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DwellingTypeService],
    }).compile();

    service = module.get<DwellingTypeService>(DwellingTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
