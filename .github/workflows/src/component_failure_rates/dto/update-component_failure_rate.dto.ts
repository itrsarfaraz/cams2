import { PartialType } from '@nestjs/swagger';
import { CreateComponentFailureRateDto } from './create-component_failure_rate.dto';

export class UpdateComponentFailureRateDto extends PartialType(CreateComponentFailureRateDto) {}
