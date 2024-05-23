import { Test, TestingModule } from '@nestjs/testing';
import { PropertyAdaptationsService } from './property_adaptations.service';

describe('PropertyAdaptationsService', () => {
  let service: PropertyAdaptationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyAdaptationsService],
    }).compile();

    service = module.get<PropertyAdaptationsService>(PropertyAdaptationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
