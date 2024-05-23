import { Module } from '@nestjs/common';
import { ConstructionTypeService } from './construction_type.service';
import { ConstructionTypeController } from './construction_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstructionType } from './entities/construction_type.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ConstructionType])],
  controllers: [ConstructionTypeController],
  providers: [ConstructionTypeService],
})
export class ConstructionTypeModule {}
