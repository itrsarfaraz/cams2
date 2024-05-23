import { ApiProperty } from "@nestjs/swagger";

export class CreateComponentTypeDto {
    id:string;

    @ApiProperty()
    name:string;
    
   
}
