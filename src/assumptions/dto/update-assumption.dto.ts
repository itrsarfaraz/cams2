import { PartialType } from '@nestjs/swagger';
import { CreateAssumptionDto } from './create-assumption.dto';

export class UpdateAssumptionDto extends PartialType(CreateAssumptionDto) {}
