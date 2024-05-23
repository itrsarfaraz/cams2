import { PartialType } from '@nestjs/swagger';
import { CreateBusinessCaseOutcomeDto } from './create-business_case_outcome.dto';

export class UpdateBusinessCaseOutcomeDto extends PartialType(CreateBusinessCaseOutcomeDto) {}
