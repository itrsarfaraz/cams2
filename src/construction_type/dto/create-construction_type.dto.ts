import { ApiProperty } from "@nestjs/swagger";

export class CreateConstructionTypeDto {
    id:string;

    @ApiProperty()
    name:string;
    

}
