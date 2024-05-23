import { PartialType } from '@nestjs/swagger';
import { CreateComponentTypeDto } from './create-component_type.dto';

export class UpdateComponentTypeDto extends PartialType(CreateComponentTypeDto) {}
