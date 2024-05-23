import { PartialType } from '@nestjs/swagger';
import { CreateSustainabilityTypeDto } from './create-sustainability_type.dto';

export class UpdateSustainabilityTypeDto extends PartialType(CreateSustainabilityTypeDto) {}
