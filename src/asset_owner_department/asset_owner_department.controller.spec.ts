import { Test, TestingModule } from '@nestjs/testing';
import { AssetOwnerDepartmentController } from './asset_owner_department.controller';
import { AssetOwnerDepartmentService } from './asset_owner_department.service';

describe('AssetOwnerDepartmentController', () => {
  let controller: AssetOwnerDepartmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetOwnerDepartmentController],
      providers: [AssetOwnerDepartmentService],
    }).compile();

    controller = module.get<AssetOwnerDepartmentController>(AssetOwnerDepartmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
