import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SustainabilityTypeService } from './sustainability_type.service';
import { CreateSustainabilityTypeDto } from './dto/create-sustainability_type.dto';
import { UpdateSustainabilityTypeDto } from './dto/update-sustainability_type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('sustainability-type')
@ApiTags('sustainability-type')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SustainabilityTypeController {
  constructor(private readonly sustainabilityTypeService: SustainabilityTypeService) {}

  @Post('create-or-update')
  create(@Body() createSustainabilityTypeDto: CreateSustainabilityTypeDto) {
    return this.sustainabilityTypeService.create(createSustainabilityTypeDto);
  }

  @Get('get-All')
  findAll() {
    return this.sustainabilityTypeService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.sustainabilityTypeService.findOne(id);
  }

 

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.sustainabilityTypeService.remove(id);
  }
}
