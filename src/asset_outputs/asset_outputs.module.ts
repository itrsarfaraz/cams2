import { Module } from '@nestjs/common';
import { AssetOutputsService } from './asset_outputs.service';
import { AssetOutputsController } from './asset_outputs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetOutput } from './entities/asset_output.entity';
import { AssetFinance } from 'src/asset_finance/entities/asset_finance.entity';
import { AssetComponent } from 'src/asset_components/entities/asset_component.entity';
import { ComponentOutput } from 'src/component_outputs/entities/component_output.entity';
import { AssetRisk } from 'src/asset_risk/entities/asset_risk.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AssetOutput,AssetFinance,AssetComponent,ComponentOutput,AssetRisk])],
  controllers: [AssetOutputsController],
  providers: [AssetOutputsService],
})
export class AssetOutputsModule {}
