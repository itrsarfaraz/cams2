import { ApiProperty } from "@nestjs/swagger";

export class CreateSustainabilityDevelopmentGoalDto {
    id:string;

    @ApiProperty()
    name:string;
    
   
}
