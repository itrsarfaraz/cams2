import { ApiProperty } from '@nestjs/swagger';

export class CreateComponentLocationDto {
  id: string;

  @ApiProperty()
  name: string;
}
