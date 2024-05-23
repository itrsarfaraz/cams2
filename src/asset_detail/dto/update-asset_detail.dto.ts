import { PartialType } from '@nestjs/swagger';
import { CreateAssetDetailDto } from './create-asset_detail.dto';

export class UpdateAssetDetailDto extends PartialType(CreateAssetDetailDto) {}
