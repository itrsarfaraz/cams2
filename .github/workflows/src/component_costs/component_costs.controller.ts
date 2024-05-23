import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ComponentCostsService } from './component_costs.service';
import { CreateComponentCostDto } from './dto/create-component_cost.dto';
import { UpdateComponentCostDto } from './dto/update-component_cost.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('component-costs')
@ApiTags('component-costs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ComponentCostsController {
  constructor(private readonly componentCostsService: ComponentCostsService) {}

  @Post('create-or-update')
  create(@Body() createComponentCostDto: CreateComponentCostDto,@Req() req) {
    return this.componentCostsService.create(createComponentCostDto,req);
  }

  @Get('get-All')
  findAll() {
    return this.componentCostsService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.componentCostsService.findOne(id);
  }

  

  @Post('delete/:id')
  remove(@Param('id') id: string,@Req() req) {
    return this.componentCostsService.remove(id,req);
  }
}
