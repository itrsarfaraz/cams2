import { Module } from '@nestjs/common';
import { PropertyAdaptationsService } from './property_adaptations.service';
import { PropertyAdaptationsController } from './property_adaptations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyAdaptation } from './entities/property_adaptation.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PropertyAdaptation])],
  controllers: [PropertyAdaptationsController],
  providers: [PropertyAdaptationsService],
})
export class PropertyAdaptationsModule {}
