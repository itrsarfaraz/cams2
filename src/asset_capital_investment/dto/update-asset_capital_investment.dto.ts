import { PartialType } from '@nestjs/swagger';
import { CreateAssetCapitalInvestmentDto } from './create-asset_capital_investment.dto';

export class UpdateAssetCapitalInvestmentDto extends PartialType(CreateAssetCapitalInvestmentDto) {}
