import { Test, TestingModule } from '@nestjs/testing';
import { ComponentOutputsService } from './component_outputs.service';

describe('ComponentOutputsService', () => {
  let service: ComponentOutputsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComponentOutputsService],
    }).compile();

    service = module.get<ComponentOutputsService>(ComponentOutputsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
