import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateComponentOutputDto {
  // @ApiProperty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  component_id: string;

  @ApiProperty()
  @IsNotEmpty()
  component_cost_id:string;

  @ApiProperty()
  @IsNotEmpty()
  component_failure_data_id:string;

  @ApiProperty()
  @IsNotEmpty()
  capex_cost: number;

  @ApiProperty()
  @IsNotEmpty()
  planned_repairs_cost_per_year: number;

  @ApiProperty()
  @IsNotEmpty()
  response_repairs_cost_per_year: number;

  

  
}

export class GetComponentOutputDto{
  @ApiProperty()
  @IsNotEmpty()
  component_cost_id:string;

  @ApiProperty()
  @IsNotEmpty()
  component_failure_data_id:string;
}
