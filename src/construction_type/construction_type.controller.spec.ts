import { Test, TestingModule } from '@nestjs/testing';
import { ConstructionTypeController } from './construction_type.controller';
import { ConstructionTypeService } from './construction_type.service';

describe('ConstructionTypeController', () => {
  let controller: ConstructionTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConstructionTypeController],
      providers: [ConstructionTypeService],
    }).compile();

    controller = module.get<ConstructionTypeController>(ConstructionTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
