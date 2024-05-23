import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { RiskDetailService } from './risk_detail.service';
import { CreateRiskDetailDto, QuickExtendDTO, RiskStatusDTO } from './dto/create-risk_detail.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { IPaginationSwagger, IPagination } from 'src/shared/paginationEum';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';


@Controller('risk-detail')
@ApiTags('risk-detail')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RiskDetailController {
  constructor(private readonly riskDetailService: RiskDetailService) {}

  @Post('create-or-update')
  create(@Body() createRiskDetailDto: CreateRiskDetailDto,@Req() req) {
    return this.riskDetailService.create(createRiskDetailDto,req);
  }

  @Get('get-All')
  findAll() {
    return this.riskDetailService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.riskDetailService.findOne("id",id);
  }

  
  @Post('delete/:id')
  remove(@Param('id') id: string,@Req() req) {
    return this.riskDetailService.remove(id,req);
  }

  @Post("change-risk-status")
  riskStatus(@Body() riskStatusDTO: RiskStatusDTO, @Req() req) {
    return this.riskDetailService.riskStatus(riskStatusDTO, req);
  }

  @Post("extend-review-date")
  quickExtend(@Body() quickExtendDTO: QuickExtendDTO, @Req() req) {
    return this.riskDetailService.quickExtend(quickExtendDTO, req);
  }

  @Get("dashboard")
  dashboard() {
    return this.riskDetailService.dashboard();
  }

  @Post("pagination")
  @ApiBody({
    schema: {
      type: "object",
      properties: IPaginationSwagger,
    },
  })
  pagination(@Body() pagination: IPagination) {
    return this.riskDetailService.pagination(pagination);
  }

  
}
