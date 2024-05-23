import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity({name:'component_failure_rates'})
export class ComponentFailureRate {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column({nullable:false})
    component_failure_id:string;

    @Column({nullable:true})
    time_from:number;

    @Column({nullable:true})
    time_to:number;

    @Column({nullable:true})
    number_of_failures:number;

    @CreateDateColumn()
    created_on:Date;

    @CreateDateColumn()
    updated_on:Date;

    @Column({type:'boolean',default:false})
    is_deleted:boolean;

}
