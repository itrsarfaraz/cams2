import { Test, TestingModule } from '@nestjs/testing';
import { AssetComponentsService } from './asset_components.service';

describe('AssetComponentsService', () => {
  let service: AssetComponentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetComponentsService],
    }).compile();

    service = module.get<AssetComponentsService>(AssetComponentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
