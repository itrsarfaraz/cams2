import { Test, TestingModule } from '@nestjs/testing';
import { ComponentFailureDataController } from './component_failure_data.controller';
import { ComponentFailureDataService } from './component_failure_data.service';

describe('ComponentFailureDataController', () => {
  let controller: ComponentFailureDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentFailureDataController],
      providers: [ComponentFailureDataService],
    }).compile();

    controller = module.get<ComponentFailureDataController>(ComponentFailureDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
