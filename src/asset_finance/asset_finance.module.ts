import { Module } from '@nestjs/common';
import { AssetFinanceService } from './asset_finance.service';
import { AssetFinanceController } from './asset_finance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetFinance } from './entities/asset_finance.entity';
import { AssetComponent } from 'src/asset_components/entities/asset_component.entity';
import { ComponentOutput } from 'src/component_outputs/entities/component_output.entity';
import { ActivityLog } from 'src/activity_logs/entities/activity_log.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AssetFinance,AssetComponent,ComponentOutput,ActivityLog])],
  controllers: [AssetFinanceController],
  providers: [AssetFinanceService],
})
export class AssetFinanceModule {}
