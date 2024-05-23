import { PartialType } from '@nestjs/swagger';
import { CreateSustainabilityDetailDto } from './create-sustainability_detail.dto';

export class UpdateSustainabilityDetailDto extends PartialType(CreateSustainabilityDetailDto) {}
