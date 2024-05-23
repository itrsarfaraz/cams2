import { PartialType } from '@nestjs/swagger';
import { CreateAssetOwnerDepartmentDto } from './create-asset_owner_department.dto';

export class UpdateAssetOwnerDepartmentDto extends PartialType(CreateAssetOwnerDepartmentDto) {}
