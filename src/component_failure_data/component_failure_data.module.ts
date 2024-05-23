import { Module } from '@nestjs/common';
import { ComponentFailureDataService } from './component_failure_data.service';
import { ComponentFailureDataController } from './component_failure_data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentFailureData } from './entities/component_failure_data.entity';
import { ActivityLog } from 'src/activity_logs/entities/activity_log.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ComponentFailureData,ActivityLog])],
  controllers: [ComponentFailureDataController],
  providers: [ComponentFailureDataService],
})
export class ComponentFailureDataModule {}
