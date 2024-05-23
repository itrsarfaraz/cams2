import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DwellingTypeService } from './dwelling_type.service';
import { CreateDwellingTypeDto } from './dto/create-dwelling_type.dto';
import { UpdateDwellingTypeDto } from './dto/update-dwelling_type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('dwelling-type')
@ApiTags('dwelling-type')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DwellingTypeController {
  constructor(private readonly dwellingTypeService: DwellingTypeService) {}

  @Post('create-or-update')
  create(@Body() createDwellingTypeDto: CreateDwellingTypeDto) {
    return this.dwellingTypeService.create(createDwellingTypeDto);
  }

  @Get('get-All')
  findAll() {
    return this.dwellingTypeService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.dwellingTypeService.findOne(id);
  }

  

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.dwellingTypeService.remove(id);
  }
}
