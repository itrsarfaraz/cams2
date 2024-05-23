import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export enum ComponentStatus {
  ACTIVE = "ACTIVE",
  INCOMPLETE = "INCOMPLETE",
  ARCHIVED = "ARCHIVED",
  UNARCHIVED = "UNARCHIVED",
}
export class CreateComponentDetailDto {
  id: string;

  // @ApiProperty()
  component_reference_number: string;

  @ApiProperty()
  @IsNotEmpty()
  component_type_id: string;

  @ApiProperty()
  @IsNotEmpty()
  component_name_id: string;

  @ApiProperty()
  component_make: string;

  @ApiProperty()
  component_model: string;

  @ApiProperty()
  @IsNotEmpty()
  component_location_id: string;
  
  @ApiProperty()
  @IsNotEmpty()
  construction_types_id: string;

  @ApiProperty()
  @IsNotEmpty()
  preferred_component: boolean;

  @ApiProperty()
  carbon_EPD_enviroImpact: string;

  @ApiProperty()
  carbon_EPD_resource_use: string;

  @ApiProperty()
  carbon_cost: number;

  @ApiProperty()
  @IsNotEmpty()
  component_review_date: Date;

  @ApiProperty()
  notes: string;

  @ApiProperty()
  visual: string;

  @ApiProperty()
  component_status: string;

  @ApiProperty()
  is_completed: boolean;

  created_on: Date;
  updated_on: Date;

  createdBy: string;
  updatedBy: string;
  deletedBy: string;
}
export class ComponentStatusDTO {
  @ApiProperty()
  @IsNotEmpty()
  componentDetails_ids: string[];

  @ApiProperty({
    type: "enum",
    default: ComponentStatus.ACTIVE,
    enumName: "component_status",
  })
  @IsNotEmpty()
  component_status: ComponentStatus;

  createdBy: string;

  updatedBy: string;

  deletedBy: string;
}
export class ComponentQuickExtendDTO {
  @ApiProperty()
  @IsNotEmpty()
  componentDetails_ids: string[];

  createdBy: string;

  updatedBy: string;

  deletedBy: string;
}
