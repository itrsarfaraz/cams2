import { ApiProperty } from "@nestjs/swagger";
export enum RoleStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = 'INACTIVE',
}
export class CreateRoleDto {
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  organization_id: string;
 
  createdBy: string;
  
  updatedBy: string;

  deletedBy: string;

  created_on: Date;

  updated_on: Date;

  is_deleted: boolean;
}

export class RoleStatusDTO {
  @ApiProperty()
  role_id: string;

  @ApiProperty({
    type: "enum",
    default: RoleStatus.ACTIVE,
    enumName: "asset_status",
  })
  role_status: RoleStatus;

  createdBy: string;

  updatedBy: string;

  deletedBy: string;
}
