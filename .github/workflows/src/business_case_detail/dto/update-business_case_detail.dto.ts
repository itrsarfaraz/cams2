import { PartialType } from '@nestjs/swagger';
import { CreateBusinessCaseDetailDto } from './create-business_case_detail.dto';

export class UpdateBusinessCaseDetailDto extends PartialType(CreateBusinessCaseDetailDto) {}
