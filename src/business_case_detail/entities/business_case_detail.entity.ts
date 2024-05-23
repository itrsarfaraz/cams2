import { BusinessCaseAssumption } from 'src/business_case_assumptions/entities/business_case_assumption.entity';
import { DueDiligenceAnswers } from 'src/due_diligence/entities/due_diligence.entity';
import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryColumn,
    Generated,
    OneToMany,
} from 'typeorm';

@Entity({ name: 'business_case_detail' })
export class BusinessCaseDetail {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column({ nullable: false })
    acquisition_business_case_name: string;

    @Column({ nullable: false })
    address_line_1: string;

    @Column({ nullable: false })
    address_line_2: string;

    @Column({ nullable: false })
    post_code: string;

    @Column({ nullable: false })
    purpose_of_business_case: string;

    @Column({ nullable: true })
    purpose_of_business_case_details: string;

    @Column({ nullable: true })
    intended_tenure: string;

    @Column({ nullable: false })
    age_of_asset: number;

    @Column({ nullable: true })
    asset_life_cycle_years_remaining: number;

    @Column({ nullable: false })
    sap_score: string;

    @Column({ nullable: false })
    proximity_to_other_stock: string;

    @Column({ nullable: false })
    is_there_high_demand_for_this_area: string;

    @Column({ nullable: false })
    owner_of_this_business_case: string;

    @CreateDateColumn()
    business_case_date: Date;

    @Column({ nullable: false })
    initial_decision: number;

    @Column({nullable:true})
    business_case_status:string

    @Column({ nullable: true })
    notes: string;

    @Column({ nullable: true })
    visual: string;

    @CreateDateColumn()
    created_on: Date;

    @CreateDateColumn()
    updated_on: Date;

    @Column({ type: 'boolean', default: false })
    is_deleted: boolean;

    @OneToMany(() => BusinessCaseAssumption, (businessCaseAssumption) => businessCaseAssumption.businessCaseDetail)
    businessCaseAssumption: BusinessCaseAssumption[];
    @OneToMany(() => DueDiligenceAnswers, (dueDiligenceAnswers) => dueDiligenceAnswers.businessCaseDetail)
    dueDiligenceAnswers: DueDiligenceAnswers[];

}