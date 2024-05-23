import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BusinessCaseDetailService } from './business_case_detail.service';
import { BusinessCaseStatusDTO, CreateBusinessCaseDetailDto } from './dto/create-business_case_detail.dto';
import { UpdateBusinessCaseDetailDto } from './dto/update-business_case_detail.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('business-case-detail')
@ApiTags('business-case-detail')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BusinessCaseDetailController {
  constructor(private readonly businessCaseDetailService: BusinessCaseDetailService) { }

  @Post('create-or-update')
  create(@Body() createBusinessCaseDetailDto: CreateBusinessCaseDetailDto) {
    return this.businessCaseDetailService.create(createBusinessCaseDetailDto);
  }

  @Get('get-All')
  findAll() {
    return this.businessCaseDetailService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.businessCaseDetailService.findOne("id", id);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.businessCaseDetailService.remove(id);
  }

  @Post("change-business-case-status")
  assetStatus(@Body() businessCaseStatusDTO: BusinessCaseStatusDTO, @Req() req) {
    return this.businessCaseDetailService.businessCaseStatus(businessCaseStatusDTO, req);
  }

  @Post('duplicate')
  duplicate(@Body() createBusinessCaseDetailDto: CreateBusinessCaseDetailDto) {
    return this.businessCaseDetailService.duplicate(createBusinessCaseDetailDto);
  }
}
