import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BusinessCaseOutcomeService } from './business_case_outcome.service';
import { CreateBusinessCaseOutcomeDto } from './dto/create-business_case_outcome.dto';
import { UpdateBusinessCaseOutcomeDto } from './dto/update-business_case_outcome.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('business-case-outcome')
@ApiTags('business-case-outcome')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BusinessCaseOutcomeController {
  constructor(private readonly businessCaseOutcomeService: BusinessCaseOutcomeService) {}

  @Post('create-or-update')
  create(@Body() createBusinessCaseOutcomeDto: CreateBusinessCaseOutcomeDto) {
    return this.businessCaseOutcomeService.create(createBusinessCaseOutcomeDto);
  }

  @Get('get-All')
  findAll() {
    return this.businessCaseOutcomeService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.businessCaseOutcomeService.findOne("id",id);
  }

 

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.businessCaseOutcomeService.remove(id);
  }
}
