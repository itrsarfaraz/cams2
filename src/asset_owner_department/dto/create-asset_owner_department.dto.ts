import { ApiProperty } from "@nestjs/swagger";
import { MaxLength } from "class-validator";

export class CreateAssetOwnerDepartmentDto {
    id:string;

    @ApiProperty()
    @MaxLength(255)
    name:string;
    
    
}
