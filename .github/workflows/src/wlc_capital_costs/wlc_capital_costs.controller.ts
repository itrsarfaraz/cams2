import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { WlcCapitalCostsService } from './wlc_capital_costs.service';
import { CreateWlcCapitalCostDto } from './dto/create-wlc_capital_cost.dto';
import { UpdateWlcCapitalCostDto } from './dto/update-wlc_capital_cost.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('wlc-capital-costs')
@ApiTags('wlc-capital-costs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WlcCapitalCostsController {
  constructor(private readonly wlcCapitalCostsService: WlcCapitalCostsService) {}

  @Post('create-or-update')
  create(@Body() createWlcCapitalCostDto: CreateWlcCapitalCostDto,@Req() req) {
    return this.wlcCapitalCostsService.create(createWlcCapitalCostDto,req);
  }

  @Get('get-All')
  findAll() {
    return this.wlcCapitalCostsService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.wlcCapitalCostsService.findOne(id);
  }
  
  @Post('delete/:id')
  remove(@Param('id') id: string,@Req() req) {
    return this.wlcCapitalCostsService.remove(id,req);
  }
}
