import { PartialType } from '@nestjs/swagger';
import { CreateRiskDetailDto } from './create-risk_detail.dto';

export class UpdateRiskDetailDto extends PartialType(CreateRiskDetailDto) {}
