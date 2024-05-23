import { ApiProperty } from "@nestjs/swagger";

export class CreateOrganizationDto {

  id: string;

  @ApiProperty()
  organization_name: string;

  @ApiProperty()
  lead_contact: string;

  @ApiProperty()
  lead_contact_email: string;

  @ApiProperty()
  licensed_users: number;

  @ApiProperty()
  fathom_version: string;

  @ApiProperty()
  license_expiry: Date;

  //   @ApiProperty()
  login_code: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  logo_file: any; // Include this field for file upload

  logo_file_name: string;

  created_on: Date;

  updated_on: Date;

  is_deleted: boolean;

  created_by: string;

  updated_by: string;

  deleted_by: string;
}
export class LogoUpload {

  id: string;

  organization_name: string;


  lead_contact: string;


  lead_contact_email: string;


  licensed_users: number;


  fathom_version: string;


  license_expiry: Date;

  login_code: string;


  logo_file: string;

  created_on: Date;

  updated_on: Date;

  is_deleted: boolean;

  created_by: string;

  updated_by: string;

  deleted_by: string;
}