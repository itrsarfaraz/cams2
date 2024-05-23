import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BusinessCaseIntendTenureService } from './business_case_intend_tenure.service';
import { CreateBusinessCaseIntendTenureDto } from './dto/create-business_case_intend_tenure.dto';
import { UpdateBusinessCaseIntendTenureDto } from './dto/update-business_case_intend_tenure.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('business-case-intend-tenure')
@ApiTags('business-case-intend-tenure')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BusinessCaseIntendTenureController {
  constructor(private readonly businessCaseIntendTenureService: BusinessCaseIntendTenureService) {}

  @Post('create-or-update')
  create(@Body() createBusinessCaseIntendTenureDto: CreateBusinessCaseIntendTenureDto) {
    return this.businessCaseIntendTenureService.create(createBusinessCaseIntendTenureDto);
  }

  @Get('get-All')
  findAll() {
    return this.businessCaseIntendTenureService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.businessCaseIntendTenureService.findOne(id);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.businessCaseIntendTenureService.remove(id);
  }
}
