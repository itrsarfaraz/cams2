import { Test, TestingModule } from '@nestjs/testing';
import { ComponentCostsController } from './component_costs.controller';
import { ComponentCostsService } from './component_costs.service';

describe('ComponentCostsController', () => {
  let controller: ComponentCostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentCostsController],
      providers: [ComponentCostsService],
    }).compile();

    controller = module.get<ComponentCostsController>(ComponentCostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
