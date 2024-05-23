import { PartialType } from '@nestjs/swagger';
import { CreateAssetRiskDto } from './create-asset_risk.dto';

export class UpdateAssetRiskDto extends PartialType(CreateAssetRiskDto) {}
