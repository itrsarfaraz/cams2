import { Test, TestingModule } from '@nestjs/testing';
import { ComponentNamesService } from './component_names.service';

describe('ComponentNamesService', () => {
  let service: ComponentNamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComponentNamesService],
    }).compile();

    service = module.get<ComponentNamesService>(ComponentNamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
