import { RiskDetail } from "src/risk_detail/entities/risk_detail.entity";
import { Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'risk_category' })
export class RiskCategory {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column({nullable:false})
    name:string;

    @Column({nullable:false})
    abbreviation:string;

    @CreateDateColumn()
    created_on: Date;
  
    @CreateDateColumn()
    updated_on: Date;
  
    @Column({ type: 'boolean', default: false })
    is_deleted: boolean;

    @OneToMany(() => RiskDetail, (riskDetail) => riskDetail.riskCategory)
    riskDetail: RiskDetail[];

}
