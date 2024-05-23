import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CapitalInvestmentOwnerService } from './capital_investment_owner.service';
import { CreateCapitalInvestmentOwnerDto } from './dto/create-capital_investment_owner.dto';
import { UpdateCapitalInvestmentOwnerDto } from './dto/update-capital_investment_owner.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('capital-investment-owner')
@ApiTags('capital-investment-owner')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CapitalInvestmentOwnerController {
  constructor(private readonly capitalInvestmentOwnerService: CapitalInvestmentOwnerService) {}

  @Post('create-or-update')
  create(@Body() createCapitalInvestmentOwnerDto: CreateCapitalInvestmentOwnerDto) {
    return this.capitalInvestmentOwnerService.create(createCapitalInvestmentOwnerDto);
  }

  @Get('get-All')
  findAll() {
    return this.capitalInvestmentOwnerService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.capitalInvestmentOwnerService.findOne(id);
  }

  

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.capitalInvestmentOwnerService.remove(id);
  }
}
