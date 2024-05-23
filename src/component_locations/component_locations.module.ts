import { Module } from '@nestjs/common';
import { ComponentLocationsService } from './component_locations.service';
import { ComponentLocationsController } from './component_locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentLocation } from './entities/component_location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ComponentLocation])],
  controllers: [ComponentLocationsController],
  providers: [ComponentLocationsService],
})
export class ComponentLocationsModule {}
