import { Test, TestingModule } from '@nestjs/testing';
import { ComponentDetailService } from './component_detail.service';

describe('ComponentDetailService', () => {
  let service: ComponentDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComponentDetailService],
    }).compile();

    service = module.get<ComponentDetailService>(ComponentDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
