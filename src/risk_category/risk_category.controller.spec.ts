import { Test, TestingModule } from '@nestjs/testing';
import { RiskCategoryController } from './risk_category.controller';
import { RiskCategoryService } from './risk_category.service';

describe('RiskCategoryController', () => {
  let controller: RiskCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiskCategoryController],
      providers: [RiskCategoryService],
    }).compile();

    controller = module.get<RiskCategoryController>(RiskCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
