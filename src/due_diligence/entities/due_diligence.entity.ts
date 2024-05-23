import { BusinessCaseDetail } from "src/business_case_detail/entities/business_case_detail.entity";
import { Organization } from "src/organization/entities/organization.entity";
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
@Entity({ name: 'due_diligence_questions' })
export class DueDiligenceQuestion {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column()
    question: string;

    @Column()
    organisation_id: string;

    @CreateDateColumn()
    created_on: Date;
  
    @CreateDateColumn()
    updated_on: Date;
  
    @Column({ type: 'boolean', default: false })
    is_deleted: boolean;

    @Column({nullable:true})
    createdBy:string;

    @Column({nullable:true})
    updatedBy:string;

    @Column({nullable:true})
    deletedBy:string;

    @OneToMany(() => DueDiligenceAnswers, (dueDiligenceAnswers) => dueDiligenceAnswers.dueDiligenceQuestion)
    dueDiligenceAnswers: DueDiligenceAnswers[];

    @ManyToOne(() => Organization, (organization) => organization.dueDiligenceQuestion)
    @JoinColumn({ name: 'organisation_id' })
    organization: Organization;
}

@Entity({ name: 'due_diligence_answers' })
export class DueDiligenceAnswers {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column()
    answer: string;

    @Column()
    question_id: string;    

    @Column()
    business_case_detail_id: string;

    @CreateDateColumn()
    created_on: Date;
  
    @CreateDateColumn()
    updated_on: Date;
  
    @Column({ type: 'boolean', default: false })
    is_deleted: boolean;

    @Column({nullable:true})
    createdBy:string;

    @Column({nullable:true})
    updatedBy:string;

    @Column({nullable:true})
    deletedBy: string;
    
    @ManyToOne(() => DueDiligenceQuestion, (dueDiligenceQuestion) => dueDiligenceQuestion.dueDiligenceAnswers)
    @JoinColumn({ name: 'question_id' })
    dueDiligenceQuestion: DueDiligenceQuestion;

    @ManyToOne(() => BusinessCaseDetail, (businessCaseDetail) => businessCaseDetail.dueDiligenceAnswers)
    @JoinColumn({ name: 'business_case_detail_id' })
    businessCaseDetail: BusinessCaseDetail;

}
