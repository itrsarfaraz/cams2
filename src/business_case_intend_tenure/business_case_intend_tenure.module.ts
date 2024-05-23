import { Module } from '@nestjs/common';
import { BusinessCaseIntendTenureService } from './business_case_intend_tenure.service';
import { BusinessCaseIntendTenureController } from './business_case_intend_tenure.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessCaseIntendTenure } from './entities/business_case_intend_tenure.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BusinessCaseIntendTenure])],
  controllers: [BusinessCaseIntendTenureController],
  providers: [BusinessCaseIntendTenureService],
})
export class BusinessCaseIntendTenureModule {}
