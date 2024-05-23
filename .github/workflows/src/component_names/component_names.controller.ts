import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ComponentNamesService } from './component_names.service';
import { CreateComponentNameDto } from './dto/create-component_name.dto';
import { UpdateComponentNameDto } from './dto/update-component_name.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('component-names')
@ApiTags('component-names')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ComponentNamesController {
  constructor(private readonly componentNamesService: ComponentNamesService) {}

  @Post('create-or-update')
  create(@Body() createComponentNameDto: CreateComponentNameDto) {
    return this.componentNamesService.create(createComponentNameDto);
  }

  @Get('getAll')
  findAll() {
    return this.componentNamesService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.componentNamesService.findOne(id);
  }

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.componentNamesService.remove(id);
  }
}
