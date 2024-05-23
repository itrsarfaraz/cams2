import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity({ name: 'component_failure_data' })
export class ComponentFailureData {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column({nullable:false})
    component_id:string;

    @Column({ type: 'boolean', default: false,nullable:false })
    is_failure_rates:boolean;

    @Column({ nullable:true })
    time_from_now_year:number;

    @Column({ nullable:true })
    no_of_failures:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:true })
    time_from_now_failures_total:number;

    @Column({ type: 'boolean', default: false,nullable:false })
    is_failures_over_period:boolean;

    @Column({ nullable:true })
    from:number;

    @Column({ nullable:true })
    to:number;

    @Column({ nullable:true })
    no_failures:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:true })
    failures_over_period_total:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:true })
    direct_costs_labour_and_materials_min:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:false })
    direct_costs_labour_and_materials_likely:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:true })
    direct_costs_labour_and_materials_max:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:true })
    downtime_duration_min:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:true })
    downtime_duration_likely:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:true })
    downtime_duration_max:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:true })
    other_penalties_compensation_min:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:true })
    other_penalties_compensation_likely:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:true })
    other_penalties_compensation_max:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:true })
    downtime_impact_min:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:true })
    downtime_impact_likely:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:true })
    downtime_impact_max:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:false })
    total_min:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:false })
    total_likely:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:false })
    total_max:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:false })
    total_across_component_life_min:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:false })
    total_across_component_life_likely:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:false })
    total_across_component_life_max:number;
    
    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:false })
    total_cost_per_year_min:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:false })
    total_cost_per_year_likely:number;

    @Column({ type: 'decimal', precision: 10, scale: 2,nullable:false })
    total_cost_per_year_max:number;

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



}
