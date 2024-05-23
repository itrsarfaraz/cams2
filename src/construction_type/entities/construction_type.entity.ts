import { AssetDetail } from "src/asset_detail/entities/asset_detail.entity";
import { ComponentDetail } from "src/component_detail/entities/component_detail.entity";
import { Entity, PrimaryColumn, Generated, Column, CreateDateColumn, OneToMany } from "typeorm";

@Entity({ name: 'construction_type' })
export class ConstructionType {
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

    @OneToMany(() => ComponentDetail, (componentDetail) => componentDetail.constructionType)
  componentDetail: ComponentDetail[];

  @OneToMany(() => AssetDetail, (assetDetail) => assetDetail.constructionType)
  assetDetail: AssetDetail[];
}
