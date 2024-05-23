import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCaseAssumptionsController } from './business_case_assumptions.controller';
import { BusinessCaseAssumptionsService } from './business_case_assumptions.service';

describe('BusinessCaseAssumptionsController', () => {
  let controller: BusinessCaseAssumptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessCaseAssumptionsController],
      providers: [BusinessCaseAssumptionsService],
    }).compile();

    controller = module.get<BusinessCaseAssumptionsController>(BusinessCaseAssumptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
