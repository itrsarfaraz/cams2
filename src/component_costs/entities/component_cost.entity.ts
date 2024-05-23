import { ComponentOutput } from "src/component_outputs/entities/component_output.entity";
import { Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'component_costs' })
export class ComponentCost {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column({nullable:false})
    component_id:string;

    @Column({nullable:false})
    capital_investment_owner_id:string;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:false })
    purchase_cost:number;
    
    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:false })
    replacement_cost:number;

    @Column({nullable:false})
    replacement_frequency:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:false })
    replacement_cost_total:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:true })
    ongoing_costs:number;

    @Column({nullable:false})
    ongoing_costs_frequency:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:true })
    ongoing_costs_total:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:false })
    planned_investment_total:number;

    @Column({nullable:false})
    maintenance_owner_id:string;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:false })
    servicing_costs:number;

    @Column({nullable:false})
    servicing_cost_frequency:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:false })
    servicing_cost_total:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:false })
    servicing_consumables_cost:number;

    @Column({nullable:false})
    consumables_cost_frequency:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:false })
    consumables_cost_total:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:false })
    maintenance_owner_total_cost:number;

    @Column({nullable:true})
    notes:string;

    @Column({nullable:true})
    visual:string;

    @Column({type:'boolean',default:false})
    is_completed:boolean;

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

    @OneToMany(() => ComponentOutput, (componentOutput) => componentOutput.componentCost)
    componentOutput: ComponentOutput[];



}
