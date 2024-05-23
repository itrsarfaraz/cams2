import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SustainabilityDetailService } from './sustainability_detail.service';
import { CreateSustainabilityDetailDto } from './dto/create-sustainability_detail.dto';
import { UpdateSustainabilityDetailDto } from './dto/update-sustainability_detail.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { IPagination, IPaginationSwagger } from 'src/shared/paginationEum';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('sustainability-detail')
@ApiTags('sustainability-detail')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SustainabilityDetailController {
  constructor(private readonly sustainabilityDetailService: SustainabilityDetailService) {}

  @Post('create-or-update')
  create(@Body() createSustainabilityDetailDto: CreateSustainabilityDetailDto) {
    return this.sustainabilityDetailService.create(createSustainabilityDetailDto);
  }

  @Get('get-All')
  findAll() {
    return this.sustainabilityDetailService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.sustainabilityDetailService.findOne("id",id);
  }
  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.sustainabilityDetailService.remove(id);
  }

  @Post("pagination")
  @ApiBody({
    schema: {
      type: "object",
      properties: IPaginationSwagger,
    },
  })
  pagination(@Body() pagination: IPagination) {
    return this.sustainabilityDetailService.pagination(pagination);
  }
}
