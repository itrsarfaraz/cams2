import { Test, TestingModule } from '@nestjs/testing';
import { ComponentNamesController } from './component_names.controller';
import { ComponentNamesService } from './component_names.service';

describe('ComponentNamesController', () => {
  let controller: ComponentNamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentNamesController],
      providers: [ComponentNamesService],
    }).compile();

    controller = module.get<ComponentNamesController>(ComponentNamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
