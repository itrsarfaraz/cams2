import { ApiProperty } from "@nestjs/swagger";

export class CreateAssetComponentDto {
    id: string;

    @ApiProperty()
    asset_detail_id:string;

    @ApiProperty()
    component_ids: string[];
    
    createdBy: string;

    updatedBy: string;
  
    deletedBy: string;
}
