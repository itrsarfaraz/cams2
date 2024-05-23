import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config.module';
import { FileUploadModule } from './fileUpload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ExcelModule } from './excel/excel.module';
import { ComponentNamesModule } from './component_names/component_names.module';
import { ComponentTypesModule } from './component_types/component_types.module';
import { BusinessCaseIntendTenureModule } from './business_case_intend_tenure/business_case_intend_tenure.module';
import { BusinessCasePurposeModule } from './business_case_purpose/business_case_purpose.module';
import { CapitalInvestmentOwnerModule } from './capital_investment_owner/capital_investment_owner.module';
import { ConstructionTypeModule } from './construction_type/construction_type.module';
import { DwellingTypeModule } from './dwelling_type/dwelling_type.module';
import { PropertyAdaptationsModule } from './property_adaptations/property_adaptations.module';
import { SustainabilityDevelopmentGoalModule } from './sustainability_development_goal/sustainability_development_goal.module';
import { PdfModule } from './pdf/pdf.module';
import { AssetOwnerDepartmentModule } from './asset_owner_department/asset_owner_department.module';
import { AssetTypesModule } from './asset_types/asset_types.module';
import { ComponentLocationsModule } from './component_locations/component_locations.module';
import { ActivityLogsModule } from './activity_logs/activity_logs.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ComponentDetailModule } from './component_detail/component_detail.module';
import { RiskCategoryModule } from './risk_category/risk_category.module';
import { SustainabilityCategoryModule } from './sustainability_category/sustainability_category.module';
import { SustainabilityTypeModule } from './sustainability_type/sustainability_type.module';
import { ComponentCostsModule } from './component_costs/component_costs.module';
import { ComponentFailureDataModule } from './component_failure_data/component_failure_data.module';
import { AssetDetailModule } from './asset_detail/asset_detail.module';
import { ComponentOutputsModule } from './component_outputs/component_outputs.module';
import { JwtModule } from '@nestjs/jwt';
import { ActivityLog } from './user/entities/user.entity';
import { BusinessCaseDetailModule } from './business_case_detail/business_case_detail.module';
import { AssumptionsModule } from './assumptions/assumptions.module';
import { OrganizationModule } from './organization/organization.module';
import { AssetOperationalCostsModule } from './asset_operational_costs/asset_operational_costs.module';
import { AssetFinanceModule } from './asset_finance/asset_finance.module';
import { AssetCapitalInvestmentModule } from './asset_capital_investment/asset_capital_investment.module';
import { AssetComponentsModule } from './asset_components/asset_components.module';
import { AssetOutputsModule } from './asset_outputs/asset_outputs.module';
import { AssetRiskModule } from './asset_risk/asset_risk.module';
import { BusinessCaseOutcomeModule } from './business_case_outcome/business_case_outcome.module';
import { ComponentFailureRatesModule } from './component_failure_rates/component_failure_rates.module';
import { DecisionCriteriaModule } from './decision_criteria/decision_criteria.module';
import { RiskDetailModule } from './risk_detail/risk_detail.module';
import { SustainabilityDetailModule } from './sustainability_detail/sustainability_detail.module';
import { RoleModule } from './role/role.module';
import { OrganisationAssumptionFieldTypesModule } from './organisation_assumption_field_types/organisation_assumption_field_types.module';
import { PermissionsModule } from './permissions/permissions.module';
import { BusinessCaseAssumptionsModule } from './business_case_assumptions/business_case_assumptions.module';
import { RolePermissionsModule } from './role_permissions/role_permissions.module';
import { DueDiligenceModule } from './due_diligence/due_diligence.module';
import { WlcCapitalCostsModule } from './wlc_capital_costs/wlc_capital_costs.module';


@Module({
  imports: [
    ConfigModule, // Add ConfigModule to the imports
    FileUploadModule, // Add FileUploadModule to the imports.
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule here as well
      useFactory: (configService: ConfigService) =>
        configService.getTypeOrmConfig(),
      inject: [ConfigService], // Inject ConfigService
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule here as well
      useFactory: (configService: ConfigService) =>
        configService.getMailerConfig(),
      inject: [ConfigService], // Inject ConfigService
    }),
    JwtModule.register({
      secret: "cams2", // Replace with your own secret key
    }),
    TypeOrmModule.forFeature([ActivityLog]),
    UserModule,
    ExcelModule,
    ComponentNamesModule,
    ComponentTypesModule,
    BusinessCaseIntendTenureModule,
    BusinessCasePurposeModule,
    CapitalInvestmentOwnerModule,
    ConstructionTypeModule,
    DwellingTypeModule,
    PropertyAdaptationsModule,
    SustainabilityDevelopmentGoalModule,
    PdfModule,
    AssetOwnerDepartmentModule,
    AssetTypesModule,
    ComponentLocationsModule,
    ActivityLogsModule,
    ComponentDetailModule,
    RiskCategoryModule,
    SustainabilityCategoryModule,
    SustainabilityTypeModule,
    BusinessCaseDetailModule,
    ComponentCostsModule,
    ComponentFailureDataModule,
    AssetDetailModule,
    ComponentOutputsModule,
    AssumptionsModule,
    OrganizationModule,
    AssetOperationalCostsModule,
    AssetFinanceModule,
    AssetCapitalInvestmentModule,
    AssetComponentsModule,
    AssetOutputsModule,
    AssetRiskModule,
    BusinessCaseOutcomeModule,
    ComponentFailureRatesModule,
    DecisionCriteriaModule,
    RiskDetailModule,
    SustainabilityDetailModule,
    RoleModule,
    OrganisationAssumptionFieldTypesModule,
    PermissionsModule,
    BusinessCaseAssumptionsModule,
    RolePermissionsModule,
    DueDiligenceModule,
    WlcCapitalCostsModule,
  ],
  controllers: [],
  providers: [LoggerMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
