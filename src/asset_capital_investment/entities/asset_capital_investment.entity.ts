import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity({name:'asset_capital_investment'})
export class AssetCapitalInvestment {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    on_costs:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    construction_costs:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    manufacture_costs:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_capital_investment:number;

    @CreateDateColumn()
    created_on:Date;

    @CreateDateColumn()
    updated_on:Date;

    @Column({type:'boolean',default:false})
    is_deleted:boolean;
}
