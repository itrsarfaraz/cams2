import { PartialType } from '@nestjs/swagger';
import { CreateSustainabilityCategoryDto } from './create-sustainability_category.dto';

export class UpdateSustainabilityCategoryDto extends PartialType(CreateSustainabilityCategoryDto) {}
