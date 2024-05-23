import { AssetComponent } from "src/asset_components/entities/asset_component.entity";
import { AssetOutput } from "src/asset_outputs/entities/asset_output.entity";
import { AssetOwnerDepartment } from "src/asset_owner_department/entities/asset_owner_department.entity";
import { AssetRisk } from "src/asset_risk/entities/asset_risk.entity";
import { AssetType } from "src/asset_types/entities/asset_type.entity";
import { ConstructionType } from "src/construction_type/entities/construction_type.entity";
import { DwellingType } from "src/dwelling_type/entities/dwelling_type.entity";
import { PropertyAdaptation } from "src/property_adaptations/entities/property_adaptation.entity";
import { Entity, PrimaryColumn, Generated, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";

@Entity({ name: 'asset_detail' })
export class AssetDetail {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column({ nullable:false })
    asset_reference_number:string;

    @Column({ nullable:true })
    asset_types_id:string

    @Column({ nullable:false })
    asset_name:string;

    @Column({ nullable:true })
    dwelling_type_id:string;

    @Column({ nullable:false })
    number_of_bedrooms:number;

    @Column({ nullable:true })
    construction_type_id:string;

    @Column({ nullable:false })
    number_of_bathrooms:number;

    @Column({ nullable:false })
    property_sqm:number;

    @Column({ nullable:true })
    property_adaptations_id:string;

    @Column({ nullable:false })
    life_cycle_period:number;

    @Column({ nullable:false })
    review_date:Date;

    @Column({ nullable:true})
    asset_owner_department_id:string;

    @Column({ type:'boolean',default:false })
    is_completed:boolean

    @Column({ nullable:true })
    asset_status:string;

    @Column({ nullable:true })
    notes:string;

    @Column({ nullable:true })
    visual:string;

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

    @ManyToOne(() => AssetType, (assetType) => assetType.assetDetail)
    @JoinColumn({ name: 'asset_types_id' })
    assetType: AssetType;

    @ManyToOne(() => DwellingType, (dwellingType) => dwellingType.assetDetail)
    @JoinColumn({ name: 'dwelling_type_id' })
    dwellingType: DwellingType;

    @ManyToOne(() => ConstructionType, (constructionType) => constructionType.assetDetail)
    @JoinColumn({ name: 'construction_type_id' })
    constructionType: ConstructionType;

    @ManyToOne(() => PropertyAdaptation, (propertyAdaptation) => propertyAdaptation.assetDetail)
    @JoinColumn({ name: 'property_adaptations_id' })
    propertyAdaptation: PropertyAdaptation;

    @ManyToOne(() => AssetOwnerDepartment, (assetOwnerDepartment) => assetOwnerDepartment.assetDetail)
    @JoinColumn({ name: 'asset_owner_department_id' })
    assetOwnerDepartment: AssetOwnerDepartment;

    @OneToMany(() => AssetComponent, (assetComponent) => assetComponent.assetDetail)
    assetComponent: AssetComponent[]

    @OneToMany(() => AssetOutput, (assetOutput) => assetOutput.assetDetail)
    assetOutput: AssetOutput[]

    @OneToMany(() => AssetRisk, (assetRisk) => assetRisk.riskDetail)
    assetRisk: AssetRisk[]
}
