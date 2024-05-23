import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BusinessCasePurposeService } from './business_case_purpose.service';
import { CreateBusinessCasePurposeDto } from './dto/create-business_case_purpose.dto';
import { UpdateBusinessCasePurposeDto } from './dto/update-business_case_purpose.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('business-case-purpose')
@ApiTags('business-case-purpose')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BusinessCasePurposeController {
  constructor(private readonly businessCasePurposeService: BusinessCasePurposeService) {}

  @Post('create-or-update')
  create(@Body() createBusinessCasePurposeDto: CreateBusinessCasePurposeDto) {
    return this.businessCasePurposeService.create(createBusinessCasePurposeDto);
  }

  @Get('get-All')
  findAll() {
    return this.businessCasePurposeService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.businessCasePurposeService.findOne(id);
  }

 

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.businessCasePurposeService.remove(id);
  }
}
