import { PartialType } from '@nestjs/swagger';
import { CreateAssetOutputDto } from './create-asset_output.dto';

export class UpdateAssetOutputDto extends PartialType(CreateAssetOutputDto) {}
