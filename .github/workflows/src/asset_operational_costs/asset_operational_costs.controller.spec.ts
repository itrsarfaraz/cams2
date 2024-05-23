import { Test, TestingModule } from '@nestjs/testing';
import { AssetOperationalCostsController } from './asset_operational_costs.controller';
import { AssetOperationalCostsService } from './asset_operational_costs.service';

describe('AssetOperationalCostsController', () => {
  let controller: AssetOperationalCostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetOperationalCostsController],
      providers: [AssetOperationalCostsService],
    }).compile();

    controller = module.get<AssetOperationalCostsController>(AssetOperationalCostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
