import { Test, TestingModule } from '@nestjs/testing';
import { DueDiligenceController } from './due_diligence.controller';
import { DueDiligenceService } from './due_diligence.service';

describe('DueDiligenceController', () => {
  let controller: DueDiligenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DueDiligenceController],
      providers: [DueDiligenceService],
    }).compile();

    controller = module.get<DueDiligenceController>(DueDiligenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
