import { Module } from '@nestjs/common';
import { ComponentFailureRatesService } from './component_failure_rates.service';
import { ComponentFailureRatesController } from './component_failure_rates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentFailureRate } from './entities/component_failure_rate.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ComponentFailureRate])],
  controllers: [ComponentFailureRatesController],
  providers: [ComponentFailureRatesService],
})
export class ComponentFailureRatesModule {}
