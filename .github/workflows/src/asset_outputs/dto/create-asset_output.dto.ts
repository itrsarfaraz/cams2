import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAssetOutputDto {
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    asset_detail_id:string;

    @ApiProperty()
    asset_capital_investment:number;

    @ApiProperty()
    component_capital_investment:number;

    @ApiProperty()
    component_operational_investment:number;

    @ApiProperty()
    asset_risk_cost_profile:number;


}

export class GetAssetOutputDto{
    @ApiProperty()
    asset_id:string;
  
    
  }
