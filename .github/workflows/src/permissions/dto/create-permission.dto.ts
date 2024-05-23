import { ApiProperty } from "@nestjs/swagger";

export class CreatePermissionDto {
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  createdBy: string;

  updatedBy: string;

  deletedBy: string;

  created_on: Date;

  updated_on: Date;

  is_deleted: boolean;
}
