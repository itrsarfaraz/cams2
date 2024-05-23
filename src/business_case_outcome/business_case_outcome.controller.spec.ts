import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCaseOutcomeController } from './business_case_outcome.controller';
import { BusinessCaseOutcomeService } from './business_case_outcome.service';

describe('BusinessCaseOutcomeController', () => {
  let controller: BusinessCaseOutcomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessCaseOutcomeController],
      providers: [BusinessCaseOutcomeService],
    }).compile();

    controller = module.get<BusinessCaseOutcomeController>(BusinessCaseOutcomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
