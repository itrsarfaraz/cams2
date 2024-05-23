import { Test, TestingModule } from '@nestjs/testing';
import { AssetRiskController } from './asset_risk.controller';
import { AssetRiskService } from './asset_risk.service';

describe('AssetRiskController', () => {
  let controller: AssetRiskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetRiskController],
      providers: [AssetRiskService],
    }).compile();

    controller = module.get<AssetRiskController>(AssetRiskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
