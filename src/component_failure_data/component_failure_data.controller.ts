import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ComponentFailureDataService } from './component_failure_data.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateComponentFailureDataDto } from './dto/create-component_failure_data.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('component-failure-data')
@ApiTags('component-failure-data')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ComponentFailureDataController {
  constructor(private readonly componentFailureDataService: ComponentFailureDataService) {}

  @Post('create-or-update')
  create(@Body() createComponentFailureDataDto: CreateComponentFailureDataDto,@Req() req) {
    return this.componentFailureDataService.create(createComponentFailureDataDto,req);
  }

  @Get('get-All')
  findAll() {
    return this.componentFailureDataService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.componentFailureDataService.findOne(id);
  }

 

  @Post('delete/:id')
  remove(@Param('id') id: string,@Req() req) {
    return this.componentFailureDataService.remove(id,req);
  }
}
