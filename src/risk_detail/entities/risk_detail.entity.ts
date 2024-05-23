import { AssetRisk } from "src/asset_risk/entities/asset_risk.entity";
import { RiskCategory } from "src/risk_category/entities/risk_category.entity";
import { Column, CreateDateColumn, Entity, Generated, OneToMany, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'risk_detail'})
export class RiskDetail {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column({nullable:false})
    risk_reference_number:string;

    @Column({nullable:false})
    risk_name:string;

    @Column({nullable:false})
    risk_type:string;

    @Column({nullable:false})
    risk_category_id:string

    @Column({nullable:false})
    description:string;

    @Column({nullable:false})
    criticality_level:string;

    @Column({nullable:false})
    assigned_to:string;

    @Column({nullable:false})
    review_frequency:Date;

    @Column({nullable:false})
    risk_status:string;

    @CreateDateColumn()
    created_on:Date;

    @CreateDateColumn()
    updated_on:Date;

    @Column({type:'boolean',default:false})
    is_deleted: boolean;
    
    
    @OneToMany(() => AssetRisk, (assetRisk) => assetRisk.riskDetail)
    assetRisk: AssetRisk[]

    @ManyToOne(() => RiskCategory, (riskCategory) => riskCategory.riskDetail )
    @JoinColumn({ name: 'risk_category_id' })
    riskCategory: RiskCategory;
  
  
  
  
}
