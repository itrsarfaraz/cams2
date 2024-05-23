import { Module } from '@nestjs/common';
import { WlcCapitalCostsService } from './wlc_capital_costs.service';
import { WlcCapitalCostsController } from './wlc_capital_costs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WlcCapitalCost } from './entities/wlc_capital_cost.entity';
import { ActivityLog } from 'src/activity_logs/entities/activity_log.entity';

@Module({
  imports:[TypeOrmModule.forFeature([WlcCapitalCost,ActivityLog])],
  controllers: [WlcCapitalCostsController],
  providers: [WlcCapitalCostsService],
})
export class WlcCapitalCostsModule {}
