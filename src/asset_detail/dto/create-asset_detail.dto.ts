import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export enum AssetStatus {
  ACTIVE = "ACTIVE",
  INCOMPLETE = "INCOMPLETE",
  ARCHIVED = "ARCHIVED",
  UNARCHIVED = "UNARCHIVED",
}
export class CreateAssetDetailDto {
  id: string;

  asset_reference_number: string;

  @ApiProperty()
  @IsNotEmpty()
  asset_types_id: string;

  @ApiProperty()
  @IsNotEmpty()
  dwelling_type_id: string;

  @ApiProperty()
  @IsString()
  asset_name: string;

  //@ApiProperty()
  asset_dwellingType_abbr: string;

  @ApiProperty()
  @IsNumber()
  number_of_bedrooms: number;

  @ApiProperty()
  construction_type_id: string;

  @ApiProperty()
  @IsNumber()
  number_of_bathrooms: number;

  @ApiProperty()
  @IsNumber()
  property_sqm: number;

  @ApiProperty()
  property_adaptations_id: string;

  @ApiProperty()
  @IsNumber()
  life_cycle_period: number;

  @ApiProperty()
  review_date: Date;

  @ApiProperty()
  asset_owner_department_id: string;

  @ApiProperty()
  is_completed: boolean;

  @ApiProperty()
  asset_status: string;

  @ApiProperty()
  notes: string;

  @ApiProperty()
  visual: string;

  createdBy: string;

  updatedBy: string;

  deletedBy: string;
}

export class AssetStatusDTO {
  @ApiProperty()
  assetDetails_ids: string[];

  @ApiProperty({
    type: "enum",
    default: AssetStatus.ACTIVE,
    enumName: "asset_status",
  })
  asset_status: AssetStatus;

  createdBy: string;

  updatedBy: string;

  deletedBy: string;
}

export class QuickExtendsDTO {
  @ApiProperty()
  assetDetails_ids: string[];

  createdBy: string;

  updatedBy: string;

  deletedBy: string;
}
