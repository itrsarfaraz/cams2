import { Module } from '@nestjs/common';
import { BusinessCaseOutcomeService } from './business_case_outcome.service';
import { BusinessCaseOutcomeController } from './business_case_outcome.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessCaseOutcome } from './entities/business_case_outcome.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BusinessCaseOutcome])],
  controllers: [BusinessCaseOutcomeController],
  providers: [BusinessCaseOutcomeService],
})
export class BusinessCaseOutcomeModule {}
