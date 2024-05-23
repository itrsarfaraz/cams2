import { PartialType } from '@nestjs/swagger';
import { CreateDecisionCriteriaDto } from './create-decision_criteria.dto';


export class UpdateDecisionCriterionDto extends PartialType(CreateDecisionCriteriaDto) {}
