import { Test, TestingModule } from '@nestjs/testing';
import { SustainabilityDevelopmentGoalController } from './sustainability_development_goal.controller';
import { SustainabilityDevelopmentGoalService } from './sustainability_development_goal.service';

describe('SustainabilityDevelopmentGoalController', () => {
  let controller: SustainabilityDevelopmentGoalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SustainabilityDevelopmentGoalController],
      providers: [SustainabilityDevelopmentGoalService],
    }).compile();

    controller = module.get<SustainabilityDevelopmentGoalController>(SustainabilityDevelopmentGoalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
