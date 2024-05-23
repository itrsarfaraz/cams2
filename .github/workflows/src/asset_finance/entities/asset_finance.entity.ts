import { Entity, PrimaryColumn, Generated, Column, CreateDateColumn } from "typeorm";

@Entity({ name: 'asset_finance' })
export class AssetFinance {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column({nullable:true})
    asset_id:string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    on_costs:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    construction_costs:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    manufacture_costs:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_capital_investment:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    planned_maintenance:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    responsive_maintenance:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_operational_cost:number;

    @Column({ type:'boolean',default:false,nullable:true })
    is_completed:boolean;

    @Column({ nullable:true })
    notes:string;

    @Column({ nullable:true })
    visual:string;

    @CreateDateColumn()
    created_on:Date;

    @CreateDateColumn()
    updated_on:Date;

    @Column({ type:'boolean',default:false,nullable:true })
    is_deleted:boolean;

    @Column({ nullable:true })
    createdBy:string;

    @Column({ nullable:true })
    updatedBy:string;


    @Column({ nullable:true })
    deletedBy:string;
}
