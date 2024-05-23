import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateAssetFinanceDto {
    id:string;

    @ApiProperty()
    @IsNotEmpty()
    asset_id:string;

    @ApiProperty()
    on_costs:number;

    @ApiProperty()
    construction_costs:number;

    @ApiProperty()
    manufacture_costs:number;

    @ApiProperty()
    total_capital_investment:number;

    @ApiProperty()
    planned_maintenance:number;

    @ApiProperty()
    responsive_maintenance:number;

    @ApiProperty()
    total_operational_cost:number;

    @ApiProperty()
    is_completed:boolean;

    @ApiProperty()
    @MaxLength(500)
    notes:string;

    @ApiProperty()
    @MaxLength(500)
    visual: string;
    
    createdBy: string;

    updatedBy: string;
  
    deletedBy: string;

}

export class CreateGetAssetOperationalCost{
    @ApiProperty()
    asset_id:string;
}

