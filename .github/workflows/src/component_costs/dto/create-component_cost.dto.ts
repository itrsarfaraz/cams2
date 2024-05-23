import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateComponentCostDto {
   
    id:string;
    
    @ApiProperty()
    @IsNotEmpty()
    component_id:string;

    @ApiProperty()
    @IsNotEmpty()
    capital_investment_owner_id:string;

    @ApiProperty()
    @IsNotEmpty()
    purchase_cost:number;

    @ApiProperty()
    @IsNotEmpty()
    replacement_cost:number;

    @ApiProperty()
    @IsNotEmpty()
    replacement_frequency:number;

    @ApiProperty()
    @IsNotEmpty()
    replacement_cost_total:number;

    @ApiProperty()
    ongoing_costs:number;

    @ApiProperty()
    ongoing_costs_frequency:number;

    @ApiProperty()
    ongoing_costs_total:number;

    @ApiProperty()
    @IsNotEmpty()
    planned_investment_total:number;

    @ApiProperty()
    @IsNotEmpty()
    maintenance_owner_id:string;

    @ApiProperty()
    @IsNotEmpty()
    servicing_costs:number;

    @ApiProperty()
    @IsNotEmpty()
    servicing_cost_frequency:number;

    @ApiProperty()
    @IsNotEmpty()
    servicing_cost_total:number;

    @ApiProperty()
    @IsNotEmpty()
    servicing_consumables_cost:number;

    @ApiProperty()
    @IsNotEmpty()
    consumables_cost_frequency:number;

    @ApiProperty()
    @IsNotEmpty()
    consumables_cost_total:number;
    
    @ApiProperty()
    @IsNotEmpty()
    maintenance_owner_total_cost:number;

    @ApiProperty()
    notes:string;
    
    @ApiProperty()
    visual:string;

    @ApiProperty()
    is_completed:boolean;

    

    



}
