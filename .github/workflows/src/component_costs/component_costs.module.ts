import { Module } from '@nestjs/common';
import { ComponentCostsService } from './component_costs.service';
import { ComponentCostsController } from './component_costs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentCost } from './entities/component_cost.entity';
import { ActivityLog } from 'src/activity_logs/entities/activity_log.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ComponentCost,ActivityLog])],
  controllers: [ComponentCostsController],
  providers: [ComponentCostsService],
})
export class ComponentCostsModule {}
