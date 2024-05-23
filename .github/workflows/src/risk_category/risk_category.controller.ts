import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RiskCategoryService } from './risk_category.service';
import { CreateRiskCategoryDto } from './dto/create-risk_category.dto';
import { UpdateRiskCategoryDto } from './dto/update-risk_category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('risk-category')
@ApiTags('risk-category')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RiskCategoryController {
  constructor(private readonly riskCategoryService: RiskCategoryService) {}

  @Post('create-or-update')
  create(@Body() createRiskCategoryDto: CreateRiskCategoryDto) {
    return this.riskCategoryService.create(createRiskCategoryDto);
  }

  @Get('get-All')
  findAll() {
    return this.riskCategoryService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.riskCategoryService.findOne(id);
  }

  

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.riskCategoryService.remove(id);
  }
}
