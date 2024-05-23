import { Test, TestingModule } from '@nestjs/testing';
import { ComponentLocationsService } from './component_locations.service';

describe('ComponentLocationsService', () => {
  let service: ComponentLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComponentLocationsService],
    }).compile();

    service = module.get<ComponentLocationsService>(ComponentLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
