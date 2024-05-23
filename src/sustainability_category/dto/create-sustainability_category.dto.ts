import { ApiProperty } from "@nestjs/swagger";

export class CreateSustainabilityCategoryDto {
    id:string;

    @ApiProperty()
    name:string;

    @ApiProperty()
    abbreviation:string;
}
