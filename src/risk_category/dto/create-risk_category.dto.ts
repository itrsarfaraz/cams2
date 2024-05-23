import { ApiProperty } from "@nestjs/swagger";

export class CreateRiskCategoryDto {
    id:string;

    @ApiProperty()
    name:string;

    @ApiProperty()
    abbreviation:string;
}
