import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateComponentFailureDataDto {
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    component_id:string;

    @ApiProperty()
    @IsNotEmpty()
    is_failure_rates:boolean;

    @ApiProperty()
    time_from_now_year:number;

    @ApiProperty()
    no_of_failures:number;

    @ApiProperty()
    time_from_now_failures_total:number;

    @ApiProperty()
    @IsNotEmpty()
    is_failures_over_period:boolean;

    @ApiProperty()
    from:number;

    @ApiProperty()
    to:number;

    @ApiProperty()
    no_failures:number;

    @ApiProperty()
    failures_over_period_total:number;

    @ApiProperty()
    direct_costs_labour_and_materials_min:number;

    @ApiProperty()
    @IsNotEmpty()
    direct_costs_labour_and_materials_likely:number;

    @ApiProperty()
    direct_costs_labour_and_materials_max:number;

    @ApiProperty()
    downtime_duration_min:number;

    @ApiProperty()
    downtime_duration_likely:number;

    @ApiProperty()
    downtime_duration_max:number;

    @ApiProperty()
    other_penalties_compensation_min:number;

    @ApiProperty()
    other_penalties_compensation_likely:number;

    @ApiProperty()
    other_penalties_compensation_max:number;

    @ApiProperty()
    downtime_impact_min:number;

    @ApiProperty()
    downtime_impact_likely:number;

    @ApiProperty()
    downtime_impact_max:number;

    @ApiProperty()
    @IsNotEmpty()
    total_min:number;

    @ApiProperty()
    @IsNotEmpty()
    total_likely:number;

    @ApiProperty()
    @IsNotEmpty()
    total_max:number;

    @ApiProperty()
    @IsNotEmpty()
    total_across_component_life_min:number;

    @ApiProperty()
    @IsNotEmpty()
    total_across_component_life_likely:number;

    @ApiProperty()
    @IsNotEmpty()
    total_across_component_life_max:number;

    @ApiProperty()
    @IsNotEmpty()
    total_cost_per_year_min:number;

    @ApiProperty()
    @IsNotEmpty()
    total_cost_per_year_likely:number;

    @ApiProperty()
    @IsNotEmpty()
    total_cost_per_year_max:number;

    @ApiProperty()
    notes:string;

    @ApiProperty()
    visual:string;




}

