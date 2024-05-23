import { AssetComponent } from "src/asset_components/entities/asset_component.entity";
import { ComponentLocation } from "src/component_locations/entities/component_location.entity";
import { ComponentName } from "src/component_names/entities/component_name.entity";
import { ComponentTypes } from "src/component_types/entities/component_type.entity";
import { ConstructionType } from "src/construction_type/entities/construction_type.entity";
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: "component_detail" })
export class ComponentDetail {
  @PrimaryColumn({ type: "uuid" })
  @Generated("uuid")
  id: string;

  @Column()
  component_reference_number: string;

  @Column()
  component_type_id: string;

  @Column()
  component_name_id: string;

  @Column()
  component_make: string;

  @Column()
  component_model: string;

  @Column()
  component_location_id: string;

  @Column()
  construction_types_id: string;

  @Column()
  preferred_component: boolean;

  @Column()
  carbon_EPD_enviroImpact: string;

  @Column()
  carbon_EPD_resource_use: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  carbon_cost: number;

  @CreateDateColumn()
  component_review_date: Date;

  @Column()
  notes: string;

  @Column()
  visual: string;

  @Column()
  component_status: string;

  @Column()
  is_completed: boolean;

  @CreateDateColumn()
  created_on: Date;

  @CreateDateColumn()
  updated_on: Date;

  @Column({ type: "boolean", default: false })
  is_deleted: boolean;

  @Column()
  createdBy: string;

  @Column()
  updatedBy: string;

  @Column()
  deletedBy: string;

  @ManyToOne(() => ComponentTypes, (componentTypes) => componentTypes.componentDetail)
  @JoinColumn({ name: 'component_type_id' })
  componentTypes: ComponentTypes;

  @ManyToOne(() => ComponentName, (componentName) => componentName.componentDetail)
  @JoinColumn({ name: 'component_name_id' })
  componentName: ComponentName;

  @ManyToOne(() => ComponentLocation, (componentLocation) => componentLocation.componentDetail)
  @JoinColumn({ name: 'component_location_id' })
  componentLocation: ComponentLocation;

  @ManyToOne(() => ConstructionType, (constructionType) => constructionType.componentDetail)
  @JoinColumn({ name: 'construction_types_id' })
  constructionType: ConstructionType;

  
  @OneToMany(() => AssetComponent, (assetComponent) => assetComponent.componentDetail)
  assetComponent: AssetComponent[]
}
