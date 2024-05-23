import { Test, TestingModule } from '@nestjs/testing';
import { AssetOutputsService } from './asset_outputs.service';

describe('AssetOutputsService', () => {
  let service: AssetOutputsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetOutputsService],
    }).compile();

    service = module.get<AssetOutputsService>(AssetOutputsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
