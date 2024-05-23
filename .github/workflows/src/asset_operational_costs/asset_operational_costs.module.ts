import { Module } from '@nestjs/common';
import { AssetOperationalCostsService } from './asset_operational_costs.service';
import { AssetOperationalCostsController } from './asset_operational_costs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetOperationalCost } from './entities/asset_operational_cost.entity';
import { ActivityLog } from 'src/user/entities/user.entity';


@Module({
  imports:[TypeOrmModule.forFeature([AssetOperationalCost,ActivityLog])],
  controllers: [AssetOperationalCostsController],
  providers: [AssetOperationalCostsService],
})
export class AssetOperationalCostsModule {}
