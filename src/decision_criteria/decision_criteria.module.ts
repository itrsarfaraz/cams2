import { Module } from '@nestjs/common';
import { DecisionCriteriaService } from './decision_criteria.service';
import { DecisionCriteriaController } from './decision_criteria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DecisionCriteria } from './entities/decision_criteria.entity';
import { ActivityLog } from 'src/activity_logs/entities/activity_log.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DecisionCriteria,ActivityLog])],
  controllers: [DecisionCriteriaController],
  providers: [DecisionCriteriaService],
})
export class DecisionCriteriaModule {}
