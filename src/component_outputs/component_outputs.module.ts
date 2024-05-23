import { Module } from '@nestjs/common';
import { ComponentOutputsService } from './component_outputs.service';
import { ComponentOutputsController } from './component_outputs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentOutput } from './entities/component_output.entity';
import { ComponentCost } from 'src/component_costs/entities/component_cost.entity';
import { ComponentFailureData } from 'src/component_failure_data/entities/component_failure_data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ComponentOutput,ComponentCost,ComponentFailureData])],
  controllers: [ComponentOutputsController],
  providers: [ComponentOutputsService],
})
export class ComponentOutputsModule {}
