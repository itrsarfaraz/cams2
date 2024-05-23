import { Module } from '@nestjs/common';
import { BusinessCaseDetailService } from './business_case_detail.service';
import { BusinessCaseDetailController } from './business_case_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessCaseDetail } from './entities/business_case_detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessCaseDetail])],
  controllers: [BusinessCaseDetailController],
  providers: [BusinessCaseDetailService],
})
export class BusinessCaseDetailModule {}
