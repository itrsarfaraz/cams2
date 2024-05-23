import { ApiProperty } from "@nestjs/swagger";

export class CreateAssetOperationalCostDto {
    id: string;

    @ApiProperty()
    planned_maintenance:number;

    @ApiProperty()
    responsive_maintenance:number;

    @ApiProperty()
    total_operational_cost: number;
    
    createdBy: string;

    updatedBy: string;
  
    deletedBy: string;

}
