import { PartialType } from '@nestjs/swagger';
import { CreateAssetOperationalCostDto } from './create-asset_operational_cost.dto';

export class UpdateAssetOperationalCostDto extends PartialType(CreateAssetOperationalCostDto) {}
