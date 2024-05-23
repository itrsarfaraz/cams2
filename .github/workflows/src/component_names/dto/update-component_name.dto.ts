import { PartialType } from '@nestjs/mapped-types';
import { CreateComponentNameDto } from './create-component_name.dto';

export class UpdateComponentNameDto extends PartialType(CreateComponentNameDto) {}
