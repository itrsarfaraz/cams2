import { Test, TestingModule } from '@nestjs/testing';
import { AssetComponentsController } from './asset_components.controller';
import { AssetComponentsService } from './asset_components.service';

describe('AssetComponentsController', () => {
  let controller: AssetComponentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetComponentsController],
      providers: [AssetComponentsService],
    }).compile();

    controller = module.get<AssetComponentsController>(AssetComponentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
