import { Test, TestingModule } from '@nestjs/testing';
import { CapitalInvestmentOwnerController } from './capital_investment_owner.controller';
import { CapitalInvestmentOwnerService } from './capital_investment_owner.service';

describe('CapitalInvestmentOwnerController', () => {
  let controller: CapitalInvestmentOwnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CapitalInvestmentOwnerController],
      providers: [CapitalInvestmentOwnerService],
    }).compile();

    controller = module.get<CapitalInvestmentOwnerController>(CapitalInvestmentOwnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
