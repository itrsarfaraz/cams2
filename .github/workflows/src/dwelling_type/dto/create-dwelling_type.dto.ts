import { ApiProperty } from "@nestjs/swagger";

export class CreateDwellingTypeDto {
    id:string;

    @ApiProperty()
    name:string;

}
