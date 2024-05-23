import { AssetDetail } from "src/asset_detail/entities/asset_detail.entity";
import { RiskDetail } from "src/risk_detail/entities/risk_detail.entity";
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({name:'asset_risk'})
export class AssetRisk {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column({ nullable:false })
    risk_id:string;

    @Column({ nullable:false })
    asset_detail_id:string;

    @Column({ nullable:true })
    risk_cost_profile:string;

    @Column({ nullable:true })
    start_yr:number;

    @Column({ nullable:true })
    finish_yr:number;

    @Column({type:'boolean',default:false})
    use_asset_life_cycle_period:boolean;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    risk_amount:number;

    @Column({nullable:false})
    probability_per_year:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    probability_cost_per_year:number;

    @Column({ nullable:true })
    intervals:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_over_planning_horizon:number;

    @Column({ nullable:true })
    variable_year1:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    variable_risk_value1:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    variable_probability1:number;

    @Column({ nullable:true })
    variable_year2:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    variable_risk_value2:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    variable_probability2:number;

    @Column({ type:'boolean',default:false })
    three_point_curve:boolean

    @Column({ nullable:true })
    variable_year3:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    variable_risk_value3:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    variable_probability3:number;

    @Column({ nullable:true })
    notes:string;

    @Column({ nullable:true })
    visual:string;

    @CreateDateColumn()
    created_on:Date;

    @CreateDateColumn()
    updated_on:Date;

    @Column({type:'boolean',default:false})
    is_deleted:boolean;

    @Column({nullable:true})
    createdBy:string;

    @Column({ nullable:true })
    updatedBy:string;

    @Column({ nullable:true })
    deletedBy:string;

    @ManyToOne(() => RiskDetail, (riskDetail) => riskDetail.assetRisk)
    @JoinColumn({ name: 'risk_id' })
    riskDetail: RiskDetail;

    @ManyToOne(() => AssetDetail, (assetDetail) => assetDetail.assetRisk)
    @JoinColumn({ name: 'asset_detail_id' })
    assetDetail: AssetDetail;
}
