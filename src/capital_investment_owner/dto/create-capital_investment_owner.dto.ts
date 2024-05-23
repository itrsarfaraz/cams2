import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class CreateCapitalInvestmentOwnerDto {
    id:string;

    @ApiProperty()
    @Length(3, 255)
    name:string;
    

}
