import { PartialType } from '@nestjs/swagger';
import { CreateSustainabilityDevelopmentGoalDto } from './create-sustainability_development_goal.dto';

export class UpdateSustainabilityDevelopmentGoalDto extends PartialType(CreateSustainabilityDevelopmentGoalDto) {}
