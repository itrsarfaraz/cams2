import { Test, TestingModule } from '@nestjs/testing';
import { DwellingTypeController } from './dwelling_type.controller';
import { DwellingTypeService } from './dwelling_type.service';

describe('DwellingTypeController', () => {
  let controller: DwellingTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DwellingTypeController],
      providers: [DwellingTypeService],
    }).compile();

    controller = module.get<DwellingTypeController>(DwellingTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
