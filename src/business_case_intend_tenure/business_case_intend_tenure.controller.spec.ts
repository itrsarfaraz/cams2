import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCaseIntendTenureController } from './business_case_intend_tenure.controller';
import { BusinessCaseIntendTenureService } from './business_case_intend_tenure.service';

describe('BusinessCaseIntendTenureController', () => {
  let controller: BusinessCaseIntendTenureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessCaseIntendTenureController],
      providers: [BusinessCaseIntendTenureService],
    }).compile();

    controller = module.get<BusinessCaseIntendTenureController>(BusinessCaseIntendTenureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
