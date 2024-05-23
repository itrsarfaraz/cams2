import { Module } from '@nestjs/common';
import { RiskCategoryService } from './risk_category.service';
import { RiskCategoryController } from './risk_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskCategory } from './entities/risk_category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([RiskCategory])],
  controllers: [RiskCategoryController],
  providers: [RiskCategoryService],
})
export class RiskCategoryModule {}
