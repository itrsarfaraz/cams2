import { ApiProperty } from "@nestjs/swagger";

export class CreateBusinessCaseOutcomeDto {
    id: string;

    @ApiProperty()
    payback_priority:boolean;

    @ApiProperty()
    payback_orgstandard:number;

    @ApiProperty()
    payback_bctarget:number;

    @ApiProperty()
    payback_primary:boolean;

    @ApiProperty()
    payback_outcome:number;

    @ApiProperty()
    npv_gt_priority:boolean;

    @ApiProperty()
    npv_gt_orgstandard:number;

    @ApiProperty()
    npv_gt_bctarget:number;

    @ApiProperty()
    npv_gt_primary:boolean;

    @ApiProperty()
    npv_gt_outcome:number;

    @ApiProperty()
    sustainabilityindex_priority:boolean;

    @ApiProperty()
    sustainabilityindex_orgstandard:number;

    @ApiProperty()
    sustainabilityindex_bctarget:number;

    @ApiProperty()
    sustainabilityindex_primary:boolean;

    @ApiProperty()
    sustainabilityindex_outcome:number;





}
