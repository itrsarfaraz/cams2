import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ComponentLocationsService } from './component_locations.service';
import { CreateComponentLocationDto } from './dto/create-component_location.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('component-locations')
@ApiTags('component-locations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ComponentLocationsController {
  constructor(
    private readonly componentLocationsService: ComponentLocationsService,
  ) {}

  @Post('create-or-update')
  create(@Body() createComponentLocationDto: CreateComponentLocationDto) {
    return this.componentLocationsService.create(createComponentLocationDto);
  }

  @Get('getAll')
  findAll() {
    return this.componentLocationsService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.componentLocationsService.findOne(id);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.componentLocationsService.remove(id);
  }
}
