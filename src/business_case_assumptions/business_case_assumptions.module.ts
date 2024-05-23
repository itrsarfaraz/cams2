import { Module } from '@nestjs/common';
import { BusinessCaseAssumptionsService } from './business_case_assumptions.service';
import { BusinessCaseAssumptionsController } from './business_case_assumptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessCaseAssumption } from './entities/business_case_assumption.entity';
import { ActivityLog } from 'src/activity_logs/entities/activity_log.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BusinessCaseAssumption,ActivityLog])],
  controllers: [BusinessCaseAssumptionsController],
  providers: [BusinessCaseAssumptionsService],
})
export class BusinessCaseAssumptionsModule {}
