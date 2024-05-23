import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessCaseAssumptionDto } from './create-business_case_assumption.dto';

export class UpdateBusinessCaseAssumptionDto extends PartialType(CreateBusinessCaseAssumptionDto) {}
