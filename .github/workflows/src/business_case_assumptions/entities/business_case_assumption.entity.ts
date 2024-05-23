import { Assumption } from "src/assumptions/entities/assumption.entity";
import { BusinessCaseDetail } from "src/business_case_detail/entities/business_case_detail.entity";
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
@Entity({ name: 'business_case_assumptions'})
export class BusinessCaseAssumption {
  @PrimaryColumn({ type: "uuid" })
  @Generated("uuid")
  id: string;

  @Column({ nullable: false })
  assumption_id: string;

  @Column({ nullable: false })
  business_case_detail_id: string;

  @Column({ nullable: true })
  default_value: string;

  @Column({ nullable: true })
  sensitive_analysis_minus: string;

  @Column({ nullable: true })
  sensitive_analysis_plus: string;

  @CreateDateColumn()
  created_on: Date;

  @CreateDateColumn()
  updated_on: Date;

  @Column({ type: "boolean", default: false })
  is_deleted: boolean;

  @ManyToOne(() => Assumption, (assumption) => assumption.businessCaseAssumption)
  @JoinColumn({ name: 'assumption_id' })
  assumption: Assumption;

  @ManyToOne(() => BusinessCaseDetail, (businessCaseDetail) => businessCaseDetail.businessCaseAssumption)
  @JoinColumn({ name: 'business_case_detail_id' })
  businessCaseDetail: BusinessCaseDetail;
}
