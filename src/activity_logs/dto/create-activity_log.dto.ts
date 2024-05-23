import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityLogDto {
  id: string;

  @ApiProperty()
  activity: string;

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  activity_date: Date;
}
