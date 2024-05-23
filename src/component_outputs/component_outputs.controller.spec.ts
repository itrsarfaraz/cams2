import { Test, TestingModule } from '@nestjs/testing';
import { ComponentOutputsController } from './component_outputs.controller';
import { ComponentOutputsService } from './component_outputs.service';

describe('ComponentOutputsController', () => {
  let controller: ComponentOutputsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentOutputsController],
      providers: [ComponentOutputsService],
    }).compile();

    controller = module.get<ComponentOutputsController>(ComponentOutputsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
