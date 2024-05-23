import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SustainabilityCategoryService } from './sustainability_category.service';
import { CreateSustainabilityCategoryDto } from './dto/create-sustainability_category.dto';
import { UpdateSustainabilityCategoryDto } from './dto/update-sustainability_category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('sustainability-category')
@ApiTags('sustainability-category')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SustainabilityCategoryController {
  constructor(private readonly sustainabilityCategoryService: SustainabilityCategoryService) {}

  @Post('create-or-update')
  create(@Body() createSustainabilityCategoryDto: CreateSustainabilityCategoryDto) {
    return this.sustainabilityCategoryService.create(createSustainabilityCategoryDto);
  }

  @Get('get-All')
  findAll() {
    return this.sustainabilityCategoryService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.sustainabilityCategoryService.findOne(id);
  }

  

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.sustainabilityCategoryService.remove(id);
  }
}
