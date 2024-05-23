import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity({name:'decision_criteria'})
export class DecisionCriteria {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column({nullable:false})
    assumption_id:string;

    @Column({nullable:false})
    business_case_detail_id:string;

    @Column({type:'boolean',default:false})
    is_priority:boolean;

    @Column()
    org_standard:string;

    @Column()
    bc_target:string;

    @Column({type:'boolean',default:false})
    is_primary:boolean;
    
    @CreateDateColumn()
    created_on:Date;

    @CreateDateColumn()
    updated_on:Date;

    @Column({type:'boolean',default:false})
    is_deleted:boolean;




}
