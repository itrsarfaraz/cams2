import { Module } from '@nestjs/common';
import { SustainabilityTypeService } from './sustainability_type.service';
import { SustainabilityTypeController } from './sustainability_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SustainabilityType } from './entities/sustainability_type.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SustainabilityType])],
  controllers: [SustainabilityTypeController],
  providers: [SustainabilityTypeService],
})
export class SustainabilityTypeModule {}
