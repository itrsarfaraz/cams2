import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AssumptionsService } from './assumptions.service';
import { CreateAssumptionDto, GetList } from './dto/create-assumption.dto';
import { UpdateAssumptionDto } from './dto/update-assumption.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('assumptions')
@ApiTags('assumptions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AssumptionsController {
  constructor(private readonly assumptionsService: AssumptionsService) { }

  @Post('create-or-update')
  create(@Body() createAssumptionDto: CreateAssumptionDto[],@Req() req) {
    return this.assumptionsService.create(createAssumptionDto,req);
  }

  @Get("getAll")
  findAll() {
    return this.assumptionsService.findAll();
  }

  @Post('getOneByField')
  getOneByField(@Body() getList: GetList) {
    return this.assumptionsService.getOneByField(getList.field_name, getList.field_value);
  }

  @Post('getAllByField')
  getAllByField(@Body() getList: GetList) {
    return this.assumptionsService.getAllByField(getList.field_name, getList.field_value);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssumptionDto: UpdateAssumptionDto) {
    return this.assumptionsService.update(+id, updateAssumptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assumptionsService.remove(+id);
  }
}
