import { PartialType } from '@nestjs/swagger';
import { CreateOrganisationAssumptionFieldTypeDto } from './create-organisation_assumption_field_type.dto';

export class UpdateOrganisationAssumptionFieldTypeDto extends PartialType(CreateOrganisationAssumptionFieldTypeDto) {}
