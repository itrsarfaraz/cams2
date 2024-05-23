import { Module } from '@nestjs/common';
import { AssumptionsService } from './assumptions.service';
import { AssumptionsController } from './assumptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assumption } from './entities/assumption.entity';
import { ActivityLog } from 'src/activity_logs/entities/activity_log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assumption,ActivityLog])],
  controllers: [AssumptionsController],
  providers: [AssumptionsService],
})
export class AssumptionsModule {}
