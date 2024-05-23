import { PartialType } from '@nestjs/swagger';
import { CreateDwellingTypeDto } from './create-dwelling_type.dto';

export class UpdateDwellingTypeDto extends PartialType(CreateDwellingTypeDto) {}
