import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDecisionCriteriaDto {
    id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    field_type_id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    assumption_id:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    business_case_detail_id:string;

    @ApiProperty()
    is_priority:boolean;

    @ApiProperty()
    org_standard:string;

    @ApiProperty()
    bc_target:string;

    @ApiProperty()
    is_primary:boolean;

}
