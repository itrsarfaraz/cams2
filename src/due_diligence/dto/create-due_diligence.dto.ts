import { ApiProperty } from "@nestjs/swagger";

export class CreateDueDiligenceDto {
    id: string;

    @ApiProperty()
    question: string;

    @ApiProperty()
    organisation_id: string;

    createdBy:string;

    updatedBy:string;

    deletedBy:string;
}

export class CreateDueDiligenceAnswersDto {
    
    id: string;
    
    @ApiProperty()
    answer: string;
    
    @ApiProperty()
    question_id: string;    
    
    @ApiProperty()
    business_case_detail_id: string;
    
    createdBy:string;

    updatedBy:string;

    deletedBy:string;
}
