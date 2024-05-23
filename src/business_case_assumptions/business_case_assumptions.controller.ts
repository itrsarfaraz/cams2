import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BusinessCaseAssumptionsService } from './business_case_assumptions.service';
import { CreateBusinessCaseAssumptionDto } from './dto/create-business_case_assumption.dto';
import { UpdateBusinessCaseAssumptionDto } from './dto/update-business_case_assumption.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { IPagination, IPaginationSwagger } from 'src/shared/paginationEum';

@Controller('business-case-assumptions')
@ApiTags('business-case-assumptions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BusinessCaseAssumptionsController {
  constructor(private readonly businessCaseAssumptionsService: BusinessCaseAssumptionsService) {}

  @Post('create-or-update')
  create(@Body() createBusinessCaseAssumptionDto: CreateBusinessCaseAssumptionDto[],@Req() req: any) {
    return this.businessCaseAssumptionsService.create(createBusinessCaseAssumptionDto,req);
  }

  
  @Get('getAll')
  findAll() {
    return this.businessCaseAssumptionsService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.businessCaseAssumptionsService.findOne("id",id);
  }


  @Post('delete/:id')
  remove(@Param('id') id: string,@Req() req) {
    return this.businessCaseAssumptionsService.remove(id,req);
  }

  @Post("pagination")
  @ApiBody({
    schema: {
      type: "object",
      properties: IPaginationSwagger,
    },
  })
  pagination(@Body() pagination: IPagination) {
    return this.businessCaseAssumptionsService.pagination(pagination);
  }
}
