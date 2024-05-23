import { Module } from '@nestjs/common';
import { CapitalInvestmentOwnerService } from './capital_investment_owner.service';
import { CapitalInvestmentOwnerController } from './capital_investment_owner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CapitalInvestmentOwner } from './entities/capital_investment_owner.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CapitalInvestmentOwner])],
  controllers: [CapitalInvestmentOwnerController],
  providers: [CapitalInvestmentOwnerService],
})
export class CapitalInvestmentOwnerModule {}
