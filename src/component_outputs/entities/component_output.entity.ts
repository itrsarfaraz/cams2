import { ComponentCost } from "src/component_costs/entities/component_cost.entity";
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: "component_outputs" })
export class ComponentOutput {
  @PrimaryColumn({ type: "uuid" })
  @Generated("uuid")
  id: string;

  @Column({nullable:false})
  component_id: string;

  @Column({nullable:false})
  component_cost_id:string;

  @Column({nullable:false})
  component_failure_data_id:string;

  @Column({ type: 'decimal', precision: 10, scale: 2,nullable:false })
  capex_cost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2,nullable:false })
  planned_repairs_cost_per_year: number;

  @Column({ type: 'decimal', precision: 10, scale: 2,nullable:false })
  response_repairs_cost_per_year: number;

  @CreateDateColumn()
  created_on: Date;

  @CreateDateColumn()
  updated_on: Date;

  @Column({ type: "boolean", default: false })
  is_deleted: boolean;

  @ManyToOne(() => ComponentCost, (componentCost) => componentCost.componentOutput )
  @JoinColumn({ name: 'component_cost_id' })
  componentCost: ComponentCost;

  
}
