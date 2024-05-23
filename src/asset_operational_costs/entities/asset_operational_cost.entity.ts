import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity({name:'asset_operational_costs'})
export class AssetOperationalCost {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    planned_maintenance:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    responsive_maintenance:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_operational_cost:number;

    @CreateDateColumn()
    created_on:Date;

    @CreateDateColumn()
    updated_on:Date;

    @Column({type:'boolean',default:false})
    is_deleted:boolean;

}
