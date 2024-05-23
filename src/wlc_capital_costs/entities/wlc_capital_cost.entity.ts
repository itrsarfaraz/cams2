import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn } from "typeorm";
@Entity({name:'wlc_capital_costs'})
export class WlcCapitalCost {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column({nullable:false})
    purchaseprice:number;

    @Column({nullable:true})
    purchaseprice_yr:string;

    @Column({nullable:false})
    legal_or_conveyancing_cost:number;

    @Column({nullable:true})
    legal_or_conveyancing_yr:string;

    @Column({nullable:false})
    otherproject_costs:number;

    @Column({nullable:true})
    otherproject_costs_yr:string;

    @Column({nullable:true})
    capitalwork_cost:number;

    @Column({nullable:true})
    capitalwork_yr:string;

    @Column({type:'boolean',default:false})
    capitalwork_useintotal:boolean;

    @Column({nullable:true})
    capitalwork_dhs_cost:number;

    @Column({nullable:true})
    capitalwork_dhs_yr:string;

    @Column({type:'boolean',default:false})
    capitalwork_dhs_useintotal:boolean;

    @Column({nullable:true})
    capitalwork_netzero_cost:number;

    @Column({nullable:true})
    capitalwork_netzero_yr:string;

    @Column({type:'boolean',default:false})
    capitalwork_netzero_useintotal:boolean;

    @Column({nullable:true})
    wlc_capitalcosts_Total:number;

    @Column({nullable:true})
    notes:string;

    @Column({nullable:true})
    visual:string;

    @CreateDateColumn()
    created_on:Date;

    @CreateDateColumn()
    updated_on:Date;

    @Column({type:'boolean',default:false})
    is_deleted:boolean;
}
