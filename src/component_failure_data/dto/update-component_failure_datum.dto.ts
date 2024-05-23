import { PartialType } from '@nestjs/swagger';
import { CreateComponentFailureDataDto } from './create-component_failure_data.dto';


export class UpdateComponentFailureDatumDto extends PartialType(CreateComponentFailureDataDto) {}
