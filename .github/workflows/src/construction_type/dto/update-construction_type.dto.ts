import { PartialType } from '@nestjs/swagger';
import { CreateConstructionTypeDto } from './create-construction_type.dto';

export class UpdateConstructionTypeDto extends PartialType(CreateConstructionTypeDto) {}
