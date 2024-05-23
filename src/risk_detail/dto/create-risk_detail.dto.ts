import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export enum RiskStatus {
    ACTIVE = 'ACTIVE',
    INCOMPLETE = 'INCOMPLETE',
    ARCHIVED = 'ARCHIVED',
    UNARCHIVED = 'UNARCHIVED'
}

export class CreateRiskDetailDto {
    id: string;
    
    risk_reference_number:string;

    // @ApiProperty()
    risk_type_abbr:string;

    // @ApiProperty()
    risk_category_abbr:string;
    
    @ApiProperty()
    @IsNotEmpty()
    @Length(3,15)
    risk_name:string;

    @ApiProperty()
    @IsNotEmpty()
    risk_type:string;

    @ApiProperty()
    @IsNotEmpty()
    risk_category_id:string

    @ApiProperty()
    @IsNotEmpty()
    description:string;

    @ApiProperty()
    @IsNotEmpty()
    criticality_level:string;

    @ApiProperty()
    @IsNotEmpty()
    assigned_to:string;

    @ApiProperty()
    @IsNotEmpty()
    review_frequency:Date;

}

export class RiskStatusDTO {
    @ApiProperty()
    @IsNotEmpty()
    riskDetails_ids: string[];
  
    @ApiProperty()
    @IsNotEmpty()
    risk_status: RiskStatus;
  
    createdBy: string;
  
    updatedBy: string;
  
    deletedBy: string;
}

export class QuickExtendDTO {
    @ApiProperty()
    @IsNotEmpty()
    riskDetails_ids: string[];
  
    createdBy: string;
  
    updatedBy: string;
  
    deletedBy: string;
  }
