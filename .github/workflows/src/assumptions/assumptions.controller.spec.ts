import { Test, TestingModule } from '@nestjs/testing';
import { AssumptionsController } from './assumptions.controller';
import { AssumptionsService } from './assumptions.service';

describe('AssumptionsController', () => {
  let controller: AssumptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssumptionsController],
      providers: [AssumptionsService],
    }).compile();

    controller = module.get<AssumptionsController>(AssumptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
