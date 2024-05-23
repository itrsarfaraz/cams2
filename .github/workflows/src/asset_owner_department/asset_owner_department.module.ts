import { Module } from '@nestjs/common';
import { AssetOwnerDepartmentService } from './asset_owner_department.service';
import { AssetOwnerDepartmentController } from './asset_owner_department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetOwnerDepartment } from './entities/asset_owner_department.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AssetOwnerDepartment])],
  controllers: [AssetOwnerDepartmentController],
  providers: [AssetOwnerDepartmentService],
})
export class AssetOwnerDepartmentModule {}
