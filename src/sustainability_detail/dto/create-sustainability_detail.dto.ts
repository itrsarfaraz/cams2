import { ApiProperty } from "@nestjs/swagger";

export class CreateSustainabilityDetailDto {
    id: string;

    
    sustainability_reference_number:string;

    @ApiProperty()
    sustainability_name:string;

    @ApiProperty()
    sustainability_type_id:string;

    @ApiProperty()
    sustainability_category_id:string;

    @ApiProperty()
    sustainable_development_goal_id:string;

    @ApiProperty()
    description:string;

    @ApiProperty()
    assigned_to:string;

    @ApiProperty()
    review_frequency:Date;

    @ApiProperty()
    qualitative_or_quantitative_measure:string;

    @ApiProperty()
    hact_social_value_calculation:number;

    @ApiProperty()
    hact_social_internal_rate_of_return:number;

    @ApiProperty()
    kpi_measure:string;

    
}
