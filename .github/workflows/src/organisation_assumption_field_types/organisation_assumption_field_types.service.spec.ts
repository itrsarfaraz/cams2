import { Test, TestingModule } from '@nestjs/testing';
import { OrganisationAssumptionFieldTypesService } from './organisation_assumption_field_types.service';

describe('OrganisationAssumptionFieldTypesService', () => {
  let service: OrganisationAssumptionFieldTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganisationAssumptionFieldTypesService],
    }).compile();

    service = module.get<OrganisationAssumptionFieldTypesService>(OrganisationAssumptionFieldTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
