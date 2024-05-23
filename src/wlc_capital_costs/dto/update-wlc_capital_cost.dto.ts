import { PartialType } from '@nestjs/swagger';
import { CreateWlcCapitalCostDto } from './create-wlc_capital_cost.dto';

export class UpdateWlcCapitalCostDto extends PartialType(CreateWlcCapitalCostDto) {}
