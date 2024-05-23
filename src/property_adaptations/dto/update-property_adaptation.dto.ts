import { PartialType } from '@nestjs/swagger';
import { CreatePropertyAdaptationDto } from './create-property_adaptation.dto';

export class UpdatePropertyAdaptationDto extends PartialType(CreatePropertyAdaptationDto) {}
