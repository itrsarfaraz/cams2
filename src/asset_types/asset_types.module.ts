import { Module } from '@nestjs/common';
import { AssetTypesService } from './asset_types.service';
import { AssetTypesController } from './asset_types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetType } from './entities/asset_type.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AssetType])],
  controllers: [AssetTypesController],
  providers: [AssetTypesService],
})
export class AssetTypesModule {}
