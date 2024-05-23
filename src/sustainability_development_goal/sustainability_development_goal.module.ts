import { Module } from '@nestjs/common';
import { SustainabilityDevelopmentGoalService } from './sustainability_development_goal.service';
import { SustainabilityDevelopmentGoalController } from './sustainability_development_goal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SustainabilityDevelopmentGoal } from './entities/sustainability_development_goal.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SustainabilityDevelopmentGoal])],
  controllers: [SustainabilityDevelopmentGoalController],
  providers: [SustainabilityDevelopmentGoalService],
})
export class SustainabilityDevelopmentGoalModule {}
