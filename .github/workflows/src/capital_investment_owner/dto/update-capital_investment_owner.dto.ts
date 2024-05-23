import { PartialType } from '@nestjs/swagger';
import { CreateCapitalInvestmentOwnerDto } from './create-capital_investment_owner.dto';

export class UpdateCapitalInvestmentOwnerDto extends PartialType(CreateCapitalInvestmentOwnerDto) {}
