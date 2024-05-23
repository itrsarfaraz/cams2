import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    IsNumber,
    Length,
} from 'class-validator';

export enum BusinessCaseStatus {
    ACTIVE = "ACTIVE",
    INCOMPLETE = "INCOMPLETE",
    ARCHIVED = "ARCHIVED",
    UNARCHIVED = "UNARCHIVED",
  }
export class CreateBusinessCaseDetailDto {
    // @ApiProperty()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    acquisition_business_case_name: string;

    @ApiProperty()
    @Length(3, 50)
    @IsNotEmpty()
    address_line_1: string;

    @ApiProperty()
    @Length(3, 50)
    @IsNotEmpty()
    address_line_2: string;

    @ApiProperty()
    @Length(3, 50)
    @IsNotEmpty()
    post_code: string;

    @ApiProperty()
    @Length(3, 50)
    @IsNotEmpty()
    purpose_of_business_case: string;

    @ApiProperty()
    @Length(3, 50)
    purpose_of_business_case_details: string;

    @ApiProperty()
    @Length(3, 50)
    intended_tenure: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    age_of_asset: number;

    @ApiProperty()
    @IsNumber()
    asset_life_cycle_years_remaining: number;

    @ApiProperty()
    @Length(3, 50)
    @IsNotEmpty()
    sap_score: string;

    @ApiProperty()
    @Length(3, 50)
    @IsNotEmpty()
    proximity_to_other_stock: string;

    @ApiProperty()
    @Length(3, 50)
    @IsNotEmpty()
    is_there_high_demand_for_this_area: string;

    @ApiProperty()
    @Length(3, 50)
    @IsNotEmpty()
    owner_of_this_business_case: string;

    @ApiProperty()
    business_case_date: Date;

    @ApiProperty()
    @IsNotEmpty()
    initial_decision: number;

    @ApiProperty()
    business_case_status:string

    @ApiProperty()
    @Length(3, 50)
    notes: string;

    @ApiProperty()
    @Length(3, 50)
    visual: string;
}

export class BusinessCaseStatusDTO {
    @ApiProperty()
    businessCaseDetails_ids: string[];
  
    @ApiProperty({
      type: "enum",
      default: BusinessCaseStatus.ACTIVE,
      enumName: " business_case_status",
    })
    business_case_status: BusinessCaseStatus;
  
    
  }
