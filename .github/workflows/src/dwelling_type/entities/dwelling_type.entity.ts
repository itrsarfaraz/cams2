import { AssetDetail } from "src/asset_detail/entities/asset_detail.entity";
import { Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'dwelling_type' })
export class DwellingType {
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

    @OneToMany(() => AssetDetail, (assetDetail) => assetDetail.dwellingType)
    assetDetail: AssetDetail[];
}
