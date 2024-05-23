import { PartialType } from '@nestjs/swagger';
import { CreateBusinessCasePurposeDto } from './create-business_case_purpose.dto';

export class UpdateBusinessCasePurposeDto extends PartialType(CreateBusinessCasePurposeDto) {}
