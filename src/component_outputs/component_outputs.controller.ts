import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ComponentOutputsService } from './component_outputs.service';
import { CreateComponentOutputDto,GetComponentOutputDto } from './dto/create-component_output.dto';
import { UpdateComponentOutputDto } from './dto/update-component_output.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller("component-outputs")
@ApiTags("component-outputs")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ComponentOutputsController {
  constructor(
    private readonly componentOutputsService: ComponentOutputsService,
  ) {}

  @Post("create-or-update")
  create(@Body() createComponentOutputDto: CreateComponentOutputDto) {
    return this.componentOutputsService.create(createComponentOutputDto);
  }

  @Post("getOutput")
  getOutput(@Body() getComponentOutputDto: GetComponentOutputDto) {
    return this.componentOutputsService.getOutput(getComponentOutputDto);
  }

  @Get("getAll")
  findAll() {
    return this.componentOutputsService.findAll();
  }

  @Get("getOne/:id")
  findOne(@Param("id") id: string) {
    return this.componentOutputsService.findOne(id);
  }

  @Post("delete/:id")
  remove(@Param("id") id: string) {
    return this.componentOutputsService.remove(id);
  }
}
