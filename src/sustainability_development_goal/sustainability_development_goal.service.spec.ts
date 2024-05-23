import { Test, TestingModule } from '@nestjs/testing';
import { SustainabilityDevelopmentGoalService } from './sustainability_development_goal.service';

describe('SustainabilityDevelopmentGoalService', () => {
  let service: SustainabilityDevelopmentGoalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SustainabilityDevelopmentGoalService],
    }).compile();

    service = module.get<SustainabilityDevelopmentGoalService>(SustainabilityDevelopmentGoalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
