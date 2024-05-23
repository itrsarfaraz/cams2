import { Test, TestingModule } from '@nestjs/testing';
import { SustainabilityCategoryController } from './sustainability_category.controller';
import { SustainabilityCategoryService } from './sustainability_category.service';

describe('SustainabilityCategoryController', () => {
  let controller: SustainabilityCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SustainabilityCategoryController],
      providers: [SustainabilityCategoryService],
    }).compile();

    controller = module.get<SustainabilityCategoryController>(SustainabilityCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
