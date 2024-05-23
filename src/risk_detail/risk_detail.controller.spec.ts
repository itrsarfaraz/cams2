import { Test, TestingModule } from '@nestjs/testing';
import { RiskDetailController } from './risk_detail.controller';
import { RiskDetailService } from './risk_detail.service';

describe('RiskDetailController', () => {
  let controller: RiskDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiskDetailController],
      providers: [RiskDetailService],
    }).compile();

    controller = module.get<RiskDetailController>(RiskDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
