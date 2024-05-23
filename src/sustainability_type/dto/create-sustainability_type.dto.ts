import { ApiProperty } from "@nestjs/swagger";

export class CreateSustainabilityTypeDto {
    id:string;

    @ApiProperty()
    name:string;

    @ApiProperty()
    abbreviation:string;
}
