import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SustainabilityDevelopmentGoalService } from './sustainability_development_goal.service';
import { CreateSustainabilityDevelopmentGoalDto } from './dto/create-sustainability_development_goal.dto';
import { UpdateSustainabilityDevelopmentGoalDto } from './dto/update-sustainability_development_goal.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('sustainability-development-goal')
@ApiTags('sustainability-development-goal')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SustainabilityDevelopmentGoalController {
  constructor(private readonly sustainabilityDevelopmentGoalService: SustainabilityDevelopmentGoalService) {}

  @Post('create-or-update')
  create(@Body() createSustainabilityDevelopmentGoalDto: CreateSustainabilityDevelopmentGoalDto) {
    return this.sustainabilityDevelopmentGoalService.create(createSustainabilityDevelopmentGoalDto);
  }

  @Get('get-All')
  findAll() {
    return this.sustainabilityDevelopmentGoalService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.sustainabilityDevelopmentGoalService.findOne(id);
  }

  

  @Post('delete/:id')
  remove(@Param('id') id: string) {
    return this.sustainabilityDevelopmentGoalService.remove(id);
  }
}
