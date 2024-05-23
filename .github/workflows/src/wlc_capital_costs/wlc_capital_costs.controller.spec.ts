import { Test, TestingModule } from '@nestjs/testing';
import { WlcCapitalCostsController } from './wlc_capital_costs.controller';
import { WlcCapitalCostsService } from './wlc_capital_costs.service';

describe('WlcCapitalCostsController', () => {
  let controller: WlcCapitalCostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WlcCapitalCostsController],
      providers: [WlcCapitalCostsService],
    }).compile();

    controller = module.get<WlcCapitalCostsController>(WlcCapitalCostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
