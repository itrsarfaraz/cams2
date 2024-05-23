import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrganisationAssumptionFieldTypesService } from './organisation_assumption_field_types.service';
import { CreateOrganisationAssumptionFieldTypeDto } from './dto/create-organisation_assumption_field_type.dto';
import { UpdateOrganisationAssumptionFieldTypeDto } from './dto/update-organisation_assumption_field_type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
@Controller('organisation-assumption-field-types')
@ApiTags('organisation-assumption-field-types')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrganisationAssumptionFieldTypesController {
  constructor(private readonly organisationAssumptionFieldTypesService: OrganisationAssumptionFieldTypesService) { }

  @Post('create')
  create(@Body() createOrganisationAssumptionFieldTypeDto: CreateOrganisationAssumptionFieldTypeDto) {
    return this.organisationAssumptionFieldTypesService.create(createOrganisationAssumptionFieldTypeDto);
  }

  @Get('getAll')
  findAll() {
    return this.organisationAssumptionFieldTypesService.findAll();
  }

  @Get('getOne/:id')
  findOne(@Param('id') id: string) {
    return this.organisationAssumptionFieldTypesService.findOne("id", id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organisationAssumptionFieldTypesService.remove(+id);
  }
}
