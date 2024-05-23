import { ApiProperty } from "@nestjs/swagger";

export class CreatePropertyAdaptationDto {
    id:string;

    @ApiProperty()
    name:string;
    
   
}
