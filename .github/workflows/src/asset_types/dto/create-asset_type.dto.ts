import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateAssetTypeDto {
    id:string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(50)
    name:string;
    
    
}
