import { Test, TestingModule } from '@nestjs/testing';
import { AssetDetailService } from './asset_detail.service';

describe('AssetDetailService', () => {
  let service: AssetDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetDetailService],
    }).compile();

    service = module.get<AssetDetailService>(AssetDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
