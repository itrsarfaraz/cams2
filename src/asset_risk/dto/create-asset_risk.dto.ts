import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateAssetRiskDto {
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    risk_id:string;

    @ApiProperty()
    @IsNotEmpty()
    asset_detail_id:string;

    @ApiProperty()
    @MaxLength(50)
    risk_cost_profile:string;

    @ApiProperty()
    start_yr:number;

    @ApiProperty()
    finish_yr:number;

    @ApiProperty()
    use_asset_life_cycle_period:boolean;

    @ApiProperty()
    risk_amount:number;

    @ApiProperty()
    probability_per_year:number;

    @ApiProperty()
    probability_cost_per_year:number;

    @ApiProperty()
    intervals:number;

    @ApiProperty()
    total_over_planning_horizon:number;

    @ApiProperty()
    variable_year1:number;

    @ApiProperty()
    variable_risk_value1:number;

    @ApiProperty()
    variable_probability1:number;

    @ApiProperty()
    variable_year2:number;

    @ApiProperty()
    variable_risk_value2:number;

    @ApiProperty()
    variable_probability2:number;
    
    @ApiProperty()
    three_point_curve:boolean

    @ApiProperty()
    variable_year3:number;

    @ApiProperty()
    variable_risk_value3:number;

    @ApiProperty()
    variable_probability3:number;

    @ApiProperty()
    @MaxLength(500)
    notes:string;

    @ApiProperty()
    @MaxLength(500)
    visual:string;

    createdBy: string;

    updatedBy: string;
  
    deletedBy: string;
}
