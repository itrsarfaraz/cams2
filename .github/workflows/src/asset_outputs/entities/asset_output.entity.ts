import { AssetDetail } from "src/asset_detail/entities/asset_detail.entity";
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({name:'asset_outputs'})
export class AssetOutput {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column({ nullable:false })
    asset_detail_id:string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    asset_capital_investment:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    component_capital_investment:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    component_operational_investment:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    asset_risk_cost_profile:number;

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
    deletedBy: string;
    
    @ManyToOne(() => AssetDetail, (assetDetail) => assetDetail.assetOutput)
    @JoinColumn({ name: 'asset_detail_id' })
    assetDetail: AssetDetail;
}
