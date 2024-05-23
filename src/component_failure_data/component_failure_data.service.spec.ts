import { Test, TestingModule } from '@nestjs/testing';
import { ComponentFailureDataService } from './component_failure_data.service';

describe('ComponentFailureDataService', () => {
  let service: ComponentFailureDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComponentFailureDataService],
    }).compile();

    service = module.get<ComponentFailureDataService>(ComponentFailureDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
