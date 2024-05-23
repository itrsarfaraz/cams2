import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCaseDetailController } from './business_case_detail.controller';
import { BusinessCaseDetailService } from './business_case_detail.service';

describe('BusinessCaseDetailController', () => {
  let controller: BusinessCaseDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessCaseDetailController],
      providers: [BusinessCaseDetailService],
    }).compile();

    controller = module.get<BusinessCaseDetailController>(BusinessCaseDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
