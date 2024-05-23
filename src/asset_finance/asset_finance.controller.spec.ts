import { Test, TestingModule } from '@nestjs/testing';
import { AssetFinanceController } from './asset_finance.controller';
import { AssetFinanceService } from './asset_finance.service';

describe('AssetFinanceController', () => {
  let controller: AssetFinanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetFinanceController],
      providers: [AssetFinanceService],
    }).compile();

    controller = module.get<AssetFinanceController>(AssetFinanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
