import { Test, TestingModule } from '@nestjs/testing';
import { AssumptionsService } from './assumptions.service';

describe('AssumptionsService', () => {
  let service: AssumptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssumptionsService],
    }).compile();

    service = module.get<AssumptionsService>(AssumptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
