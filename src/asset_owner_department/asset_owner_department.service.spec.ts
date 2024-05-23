import { Test, TestingModule } from '@nestjs/testing';
import { AssetOwnerDepartmentService } from './asset_owner_department.service';

describe('AssetOwnerDepartmentService', () => {
  let service: AssetOwnerDepartmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetOwnerDepartmentService],
    }).compile();

    service = module.get<AssetOwnerDepartmentService>(AssetOwnerDepartmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
