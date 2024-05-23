import { ApiProperty } from "@nestjs/swagger";

export class CreateAssetCapitalInvestmentDto {
    id: string;

    @ApiProperty()
    on_costs:number;

    @ApiProperty()
    construction_costs:number;

    @ApiProperty()
    manufacture_costs:number;

    @ApiProperty()
    total_capital_investment:number;
}
