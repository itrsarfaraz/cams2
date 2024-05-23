import { Module } from '@nestjs/common';
import { AssetCapitalInvestmentService } from './asset_capital_investment.service';
import { AssetCapitalInvestmentController } from './asset_capital_investment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetCapitalInvestment } from './entities/asset_capital_investment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AssetCapitalInvestment])],
  controllers: [AssetCapitalInvestmentController],
  providers: [AssetCapitalInvestmentService],
})
export class AssetCapitalInvestmentModule {}
