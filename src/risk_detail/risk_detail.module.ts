import { Module } from '@nestjs/common';
import { RiskDetailService } from './risk_detail.service';
import { RiskDetailController } from './risk_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskDetail } from './entities/risk_detail.entity';
import { RiskCategory } from 'src/risk_category/entities/risk_category.entity';
import { ActivityLog } from 'src/activity_logs/entities/activity_log.entity';

@Module({
  imports:[TypeOrmModule.forFeature([RiskDetail,RiskCategory,ActivityLog])],
  controllers: [RiskDetailController],
  providers: [RiskDetailService],
})
export class RiskDetailModule {}
