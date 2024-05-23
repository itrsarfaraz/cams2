import { Test, TestingModule } from '@nestjs/testing';
import { DecisionCriteriaController } from './decision_criteria.controller';
import { DecisionCriteriaService } from './decision_criteria.service';

describe('DecisionCriteriaController', () => {
  let controller: DecisionCriteriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DecisionCriteriaController],
      providers: [DecisionCriteriaService],
    }).compile();

    controller = module.get<DecisionCriteriaController>(DecisionCriteriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
