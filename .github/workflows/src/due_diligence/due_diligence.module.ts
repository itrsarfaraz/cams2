import { Module } from '@nestjs/common';
import { DueDiligenceService } from './due_diligence.service';
import { DueDiligenceController } from './due_diligence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DueDiligenceAnswers, DueDiligenceQuestion } from './entities/due_diligence.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DueDiligenceQuestion,DueDiligenceAnswers])],
  controllers: [DueDiligenceController],
  providers: [DueDiligenceService],
})
export class DueDiligenceModule {}
