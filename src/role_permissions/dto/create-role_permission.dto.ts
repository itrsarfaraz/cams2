import { ApiProperty } from "@nestjs/swagger";

export class CreateRolePermissionDto {
  id: string;

  // @ApiProperty()
  // name: string;

  @ApiProperty()
  role_id: string;

  @ApiProperty()
  permissions_id: string;

  createdBy: string;

  updatedBy: string;

  deletedBy: string;
}
