import { Module } from '@nestjs/common';
import { AssetRiskService } from './asset_risk.service';
import { AssetRiskController } from './asset_risk.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetRisk } from './entities/asset_risk.entity';
import { ActivityLog } from 'src/activity_logs/entities/activity_log.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AssetRisk,ActivityLog])],
  controllers: [AssetRiskController],
  providers: [AssetRiskService],
})
export class AssetRiskModule {}
