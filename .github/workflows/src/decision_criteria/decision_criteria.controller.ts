import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { DecisionCriteriaService } from './decision_criteria.service';
import { CreateDecisionCriteriaDto } from './dto/create-decision_criteria.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';


@Controller('decision-criteria')
@ApiTags('decision-criteria')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DecisionCriteriaController {
  constructor(private readonly decisionCriteriaService: DecisionCriteriaService) { }

  @Post('create-or-update')
  create(@Body() createDecisionCriteriaDto: CreateDecisionCriteriaDto[],@Req() req: any) {
    return this.decisionCriteriaService.create(createDecisionCriteriaDto,req);
  }

  @Get('get-All')
  findAll() {
    return this.decisionCriteriaService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.decisionCriteriaService.findOne("id", id);
  }



  @Post('delete/:id')
  remove(@Param('id') id: string,@Req() req) {
    return this.decisionCriteriaService.remove(id,req);
  }
}
