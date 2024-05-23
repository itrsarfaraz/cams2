import { ApiProperty } from "@nestjs/swagger";

export class CreateComponentNameDto {
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  component_type_id: string;
}
