import { Module } from '@nestjs/common';
import { AssetDetailService } from './asset_detail.service';
import { AssetDetailController } from './asset_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetDetail } from './entities/asset_detail.entity';
import { DwellingType } from 'src/dwelling_type/entities/dwelling_type.entity';
import { AssetFinance } from 'src/asset_finance/entities/asset_finance.entity';
import { ActivityLog } from 'src/activity_logs/entities/activity_log.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AssetDetail,DwellingType,AssetFinance,ActivityLog])],
  controllers: [AssetDetailController],
  providers: [AssetDetailService],
})
export class AssetDetailModule {}
