import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ComponentFailureRatesService } from './component_failure_rates.service';
import { CreateComponentFailureRateDto } from './dto/create-component_failure_rate.dto';
import { UpdateComponentFailureRateDto } from './dto/update-component_failure_rate.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('component-failure-rates')
@ApiTags('component-failure-rates')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ComponentFailureRatesController {
  constructor(private readonly componentFailureRatesService: ComponentFailureRatesService) {}

  @Post('create-or-update')
  create(@Body() createComponentFailureRateDto: CreateComponentFailureRateDto) {
    return this.componentFailureRatesService.create(createComponentFailureRateDto);
  }

  @Get('get-All')
  findAll() {
    return this.componentFailureRatesService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.componentFailureRatesService.findOne("id",id);
  }

 

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.componentFailureRatesService.remove(id);
  }
}
