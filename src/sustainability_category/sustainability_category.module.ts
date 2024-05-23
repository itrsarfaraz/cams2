import { Module } from '@nestjs/common';
import { SustainabilityCategoryService } from './sustainability_category.service';
import { SustainabilityCategoryController } from './sustainability_category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SustainabilityCategory } from './entities/sustainability_category.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SustainabilityCategory])],
  controllers: [SustainabilityCategoryController],
  providers: [SustainabilityCategoryService],
})
export class SustainabilityCategoryModule {}
