import { Module } from '@nestjs/common';
import { OrganisationAssumptionFieldTypesService } from './organisation_assumption_field_types.service';
import { OrganisationAssumptionFieldTypesController } from './organisation_assumption_field_types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganisationAssumptionFieldType } from './entities/organisation_assumption_field_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrganisationAssumptionFieldType])],
  controllers: [OrganisationAssumptionFieldTypesController],
  providers: [OrganisationAssumptionFieldTypesService],
})
export class OrganisationAssumptionFieldTypesModule {}
