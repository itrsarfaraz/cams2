import { Module } from '@nestjs/common';
import { ComponentDetailService } from './component_detail.service';
import { ComponentDetailController } from './component_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentDetail } from './entities/component_detail.entity';
import { ActivityLog } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ComponentDetail, ActivityLog])],
  controllers: [ComponentDetailController],
  providers: [ComponentDetailService],
})
export class ComponentDetailModule { }
