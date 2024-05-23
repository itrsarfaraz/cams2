import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength, ValidateNested } from "class-validator";

export class CreateBusinessCaseAssumptionDto {
    id:string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    assumption_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    business_case_detail_id: string;

    @ApiProperty()
    @MaxLength(225)
    default_value: string;

    @ApiProperty()
    @MaxLength(225)
    sensitive_analysis_minus: string;

    @ApiProperty()
    @MaxLength(225)
    sensitive_analysis_plus: string;
 }

 