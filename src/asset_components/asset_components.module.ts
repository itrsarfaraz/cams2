import { Module } from '@nestjs/common';
import { AssetComponentsService } from './asset_components.service';
import { AssetComponentsController } from './asset_components.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetComponent } from './entities/asset_component.entity';
import { ActivityLog } from 'src/activity_logs/entities/activity_log.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AssetComponent,ActivityLog])],
  controllers: [AssetComponentsController],
  providers: [AssetComponentsService],
})
export class AssetComponentsModule {}
