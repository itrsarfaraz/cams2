import { ApiProperty } from "@nestjs/swagger";
export class CreateWlcCapitalCostDto {
    id: string;

    @ApiProperty()
    purchaseprice:number;

    @ApiProperty()
    purchaseprice_yr:string;

    @ApiProperty()
    legal_or_conveyancing_cost:number;

    @ApiProperty()
    legal_or_conveyancing_yr:string;

    @ApiProperty()
    otherproject_costs:number;

    @ApiProperty()
    otherproject_costs_yr:string;

    @ApiProperty()
    capitalwork_cost:number;

    @ApiProperty()
    capitalwork_yr:string;

    @ApiProperty()
    capitalwork_useintotal:boolean;

    @ApiProperty()
    capitalwork_dhs_cost:number;

    @ApiProperty()
    capitalwork_dhs_yr:string;

    @ApiProperty()
    capitalwork_dhs_useintotal:boolean;

    @ApiProperty()
    capitalwork_netzero_cost:number;

    @ApiProperty()
    capitalwork_netzero_yr:string;

    @ApiProperty()
    capitalwork_netzero_useintotal:boolean;

    @ApiProperty()
    wlc_capitalcosts_Total:number;

    @ApiProperty()
    notes:string;

    @ApiProperty()
    visual:string;
}
