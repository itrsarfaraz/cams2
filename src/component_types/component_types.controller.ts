import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ComponentTypesService } from './component_types.service';
import { CreateComponentTypeDto } from './dto/create-component_type.dto';
import { UpdateComponentTypeDto } from './dto/update-component_type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('component-types')
@ApiTags('component-types')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ComponentTypesController {
  constructor(private readonly componentTypesService: ComponentTypesService) {}

  @Post('create-or-update')
  create(@Body() createComponentTypeDto: CreateComponentTypeDto) {
    return this.componentTypesService.create(createComponentTypeDto);
  }

  @Get('get-All')
  findAll() {
    return this.componentTypesService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.componentTypesService.findOne(id);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.componentTypesService.remove(id);
  }
}
