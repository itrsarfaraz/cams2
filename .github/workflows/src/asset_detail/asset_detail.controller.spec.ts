import { Test, TestingModule } from '@nestjs/testing';
import { AssetDetailController } from './asset_detail.controller';
import { AssetDetailService } from './asset_detail.service';

describe('AssetDetailController', () => {
  let controller: AssetDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetDetailController],
      providers: [AssetDetailService],
    }).compile();

    controller = module.get<AssetDetailController>(AssetDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
