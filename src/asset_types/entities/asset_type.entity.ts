import { AssetDetail } from "src/asset_detail/entities/asset_detail.entity";
import { Entity, PrimaryColumn, Generated, Column, CreateDateColumn, OneToMany } from "typeorm";

@Entity({ name: 'asset_types' })
export class AssetType {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column({nullable:false})
    name:string;

    @CreateDateColumn()
    created_on: Date;
  
    @CreateDateColumn()
    updated_on: Date;
  
    @Column({ type: 'boolean', default: false })
    is_deleted: boolean;

    @OneToMany(() => AssetDetail, (assetDetail) => assetDetail.assetType)
    assetDetail: AssetDetail[];
}
