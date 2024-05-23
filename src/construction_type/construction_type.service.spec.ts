import { Test, TestingModule } from '@nestjs/testing';
import { ConstructionTypeService } from './construction_type.service';

describe('ConstructionTypeService', () => {
  let service: ConstructionTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConstructionTypeService],
    }).compile();

    service = module.get<ConstructionTypeService>(ConstructionTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
