import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCasePurposeController } from './business_case_purpose.controller';
import { BusinessCasePurposeService } from './business_case_purpose.service';

describe('BusinessCasePurposeController', () => {
  let controller: BusinessCasePurposeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessCasePurposeController],
      providers: [BusinessCasePurposeService],
    }).compile();

    controller = module.get<BusinessCasePurposeController>(BusinessCasePurposeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
