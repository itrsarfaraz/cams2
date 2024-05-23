import { Test, TestingModule } from '@nestjs/testing';
import { PropertyAdaptationsController } from './property_adaptations.controller';
import { PropertyAdaptationsService } from './property_adaptations.service';

describe('PropertyAdaptationsController', () => {
  let controller: PropertyAdaptationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyAdaptationsController],
      providers: [PropertyAdaptationsService],
    }).compile();

    controller = module.get<PropertyAdaptationsController>(PropertyAdaptationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
