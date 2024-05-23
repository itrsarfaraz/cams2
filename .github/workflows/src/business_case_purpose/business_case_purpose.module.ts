import { Module } from '@nestjs/common';
import { BusinessCasePurposeService } from './business_case_purpose.service';
import { BusinessCasePurposeController } from './business_case_purpose.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessCasePurpose } from './entities/business_case_purpose.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BusinessCasePurpose])],
  controllers: [BusinessCasePurposeController],
  providers: [BusinessCasePurposeService],
})
export class BusinessCasePurposeModule {}
