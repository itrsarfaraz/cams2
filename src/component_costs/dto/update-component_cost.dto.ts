import { PartialType } from '@nestjs/swagger';
import { CreateComponentCostDto } from './create-component_cost.dto';

export class UpdateComponentCostDto extends PartialType(CreateComponentCostDto) {}
