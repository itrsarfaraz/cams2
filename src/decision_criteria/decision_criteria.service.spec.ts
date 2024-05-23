import { Test, TestingModule } from '@nestjs/testing';
import { DecisionCriteriaService } from './decision_criteria.service';

describe('DecisionCriteriaService', () => {
  let service: DecisionCriteriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DecisionCriteriaService],
    }).compile();

    service = module.get<DecisionCriteriaService>(DecisionCriteriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
