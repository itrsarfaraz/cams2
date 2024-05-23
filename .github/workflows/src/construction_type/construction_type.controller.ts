import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ConstructionTypeService } from './construction_type.service';
import { CreateConstructionTypeDto } from './dto/create-construction_type.dto';
import { UpdateConstructionTypeDto } from './dto/update-construction_type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('construction-type')
@ApiTags('construction-type')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ConstructionTypeController {
  constructor(private readonly constructionTypeService: ConstructionTypeService) {}

  @Post('create-or-update')
  create(@Body() createConstructionTypeDto: CreateConstructionTypeDto) {
    return this.constructionTypeService.create(createConstructionTypeDto);
  }

  @Get('get-All')
  findAll() {
    return this.constructionTypeService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.constructionTypeService.findOne(id);
  }

  

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.constructionTypeService.remove(id);
  }
}
