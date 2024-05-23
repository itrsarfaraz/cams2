import { ApiProperty } from "@nestjs/swagger";

export class CreateComponentFailureRateDto {
    id: string;

    @ApiProperty()
    component_failure_id:string;

    @ApiProperty()
    time_from:number;

    @ApiProperty()
    time_to:number;

    @ApiProperty()
    number_of_failures:number;


}
