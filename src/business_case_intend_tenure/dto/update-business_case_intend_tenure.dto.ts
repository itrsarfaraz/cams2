import { PartialType } from '@nestjs/swagger';
import { CreateBusinessCaseIntendTenureDto } from './create-business_case_intend_tenure.dto';

export class UpdateBusinessCaseIntendTenureDto extends PartialType(CreateBusinessCaseIntendTenureDto) {}
