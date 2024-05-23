import { PartialType } from '@nestjs/swagger';
import { CreateRiskCategoryDto } from './create-risk_category.dto';

export class UpdateRiskCategoryDto extends PartialType(CreateRiskCategoryDto) {}
