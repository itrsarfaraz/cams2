import { PartialType } from '@nestjs/swagger';
import { CreateAssetFinanceDto } from './create-asset_finance.dto';

export class UpdateAssetFinanceDto extends PartialType(CreateAssetFinanceDto) {}
