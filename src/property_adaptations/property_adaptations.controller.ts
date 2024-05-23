import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PropertyAdaptationsService } from './property_adaptations.service';
import { CreatePropertyAdaptationDto } from './dto/create-property_adaptation.dto';
import { UpdatePropertyAdaptationDto } from './dto/update-property_adaptation.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('property-adaptations')
@ApiTags('property-adaptations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PropertyAdaptationsController {
  constructor(private readonly propertyAdaptationsService: PropertyAdaptationsService) {}

  @Post('create-or-update')
  create(@Body() createPropertyAdaptationDto: CreatePropertyAdaptationDto) {
    return this.propertyAdaptationsService.create(createPropertyAdaptationDto);
  }

  @Get('get-All')
  findAll() {
    return this.propertyAdaptationsService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.propertyAdaptationsService.findOne(id);
  }

  
  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.propertyAdaptationsService.remove(id);
  }
}
