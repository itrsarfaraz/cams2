import { Module } from '@nestjs/common';
import { SustainabilityDetailService } from './sustainability_detail.service';
import { SustainabilityDetailController } from './sustainability_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SustainabilityDetail } from './entities/sustainability_detail.entity';
import { SustainabilityCategory } from 'src/sustainability_category/entities/sustainability_category.entity';
import { SustainabilityType } from 'src/sustainability_type/entities/sustainability_type.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SustainabilityDetail,SustainabilityCategory,SustainabilityType])],
  controllers: [SustainabilityDetailController],
  providers: [SustainabilityDetailService],
})
export class SustainabilityDetailModule {}
