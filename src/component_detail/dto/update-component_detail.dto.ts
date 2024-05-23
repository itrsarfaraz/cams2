import { PartialType } from '@nestjs/mapped-types';
import { CreateComponentDetailDto } from './create-component_detail.dto';

export class UpdateComponentDetailDto extends PartialType(CreateComponentDetailDto) {}
