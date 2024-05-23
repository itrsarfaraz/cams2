import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ActivityLogsService } from './activity_logs.service';
import { CreateActivityLogDto } from './dto/create-activity_log.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { IPagination, IPaginationSwagger } from 'src/shared/paginationEum';

@Controller('activity-logs')
@ApiTags('activity-logs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ActivityLogsController {
  constructor(private readonly activityLogsService: ActivityLogsService) {}

  @Post('create')
  create(@Body() createActivityLogDto: CreateActivityLogDto) {
    return this.activityLogsService.create(createActivityLogDto);
  }

  @Get('getAll')
  findAll() {
    return this.activityLogsService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.activityLogsService.findOne(id);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.activityLogsService.remove(id);
  }

  
  @Post("pagination")
  @ApiBody({
    schema: {
      type: "object",
      properties: IPaginationSwagger,
    },
  })
  pagination(@Body() pagination: IPagination) {
    return this.activityLogsService.pagination(pagination);
  }
}
