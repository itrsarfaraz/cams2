import { PartialType } from '@nestjs/mapped-types';
import { CreateComponentOutputDto } from './create-component_output.dto';

export class UpdateComponentOutputDto extends PartialType(CreateComponentOutputDto) {}
