import { AssetDetail } from "src/asset_detail/entities/asset_detail.entity";
import { ComponentDetail } from "src/component_detail/entities/component_detail.entity";
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({name:'asset_components'})
export class AssetComponent {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column({ nullable:true })
    asset_detail_id:string;

    @Column({ nullable:true })
    component_id:string;

    @CreateDateColumn()
    created_on:Date;

    @CreateDateColumn()
    updated_on:Date;

    @Column({type:'boolean',default:false})
    is_deleted: boolean;

    @Column({nullable:true})
    createdBy:string;

    @Column({nullable:true})
    updatedBy:string;

    @Column({nullable:true})
    deletedBy:string;
    
    @ManyToOne(() => AssetDetail, (assetDetail) => assetDetail.assetComponent)
    @JoinColumn({ name: 'asset_detail_id' })
    assetDetail: AssetDetail;

    @ManyToOne(() => ComponentDetail, (componentDetail) => componentDetail.assetComponent)
    @JoinColumn({ name: 'component_id' })
    componentDetail: ComponentDetail;
}
