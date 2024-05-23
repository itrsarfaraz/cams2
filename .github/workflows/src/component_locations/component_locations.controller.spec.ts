import { Test, TestingModule } from '@nestjs/testing';
import { ComponentLocationsController } from './component_locations.controller';
import { ComponentLocationsService } from './component_locations.service';

describe('ComponentLocationsController', () => {
  let controller: ComponentLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentLocationsController],
      providers: [ComponentLocationsService],
    }).compile();

    controller = module.get<ComponentLocationsController>(ComponentLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
