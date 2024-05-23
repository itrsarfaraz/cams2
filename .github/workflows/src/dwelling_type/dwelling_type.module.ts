import { Module } from '@nestjs/common';
import { DwellingTypeService } from './dwelling_type.service';
import { DwellingTypeController } from './dwelling_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DwellingType } from './entities/dwelling_type.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DwellingType])],
  controllers: [DwellingTypeController],
  providers: [DwellingTypeService],
})
export class DwellingTypeModule {}
