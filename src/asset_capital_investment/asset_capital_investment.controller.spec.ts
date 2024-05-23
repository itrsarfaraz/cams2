import { Test, TestingModule } from '@nestjs/testing';
import { AssetCapitalInvestmentController } from './asset_capital_investment.controller';
import { AssetCapitalInvestmentService } from './asset_capital_investment.service';

describe('AssetCapitalInvestmentController', () => {
  let controller: AssetCapitalInvestmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetCapitalInvestmentController],
      providers: [AssetCapitalInvestmentService],
    }).compile();

    controller = module.get<AssetCapitalInvestmentController>(AssetCapitalInvestmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
