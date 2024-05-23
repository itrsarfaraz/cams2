import { Module } from '@nestjs/common';
import { ComponentNamesService } from './component_names.service';
import { ComponentNamesController } from './component_names.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentName } from './entities/component_name.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ComponentName])],
  controllers: [ComponentNamesController],
  providers: [ComponentNamesService],
})
export class ComponentNamesModule {}
