import { Test, TestingModule } from '@nestjs/testing';
import { AssetOutputsController } from './asset_outputs.controller';
import { AssetOutputsService } from './asset_outputs.service';

describe('AssetOutputsController', () => {
  let controller: AssetOutputsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetOutputsController],
      providers: [AssetOutputsService],
    }).compile();

    controller = module.get<AssetOutputsController>(AssetOutputsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
