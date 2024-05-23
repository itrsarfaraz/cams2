import { Test, TestingModule } from '@nestjs/testing';
import { OrganisationAssumptionFieldTypesController } from './organisation_assumption_field_types.controller';
import { OrganisationAssumptionFieldTypesService } from './organisation_assumption_field_types.service';

describe('OrganisationAssumptionFieldTypesController', () => {
  let controller: OrganisationAssumptionFieldTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganisationAssumptionFieldTypesController],
      providers: [OrganisationAssumptionFieldTypesService],
    }).compile();

    controller = module.get<OrganisationAssumptionFieldTypesController>(OrganisationAssumptionFieldTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
