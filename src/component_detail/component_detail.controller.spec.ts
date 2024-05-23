import { Test, TestingModule } from '@nestjs/testing';
import { ComponentDetailController } from './component_detail.controller';
import { ComponentDetailService } from './component_detail.service';

describe('ComponentDetailController', () => {
  let controller: ComponentDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentDetailController],
      providers: [ComponentDetailService],
    }).compile();

    controller = module.get<ComponentDetailController>(ComponentDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
