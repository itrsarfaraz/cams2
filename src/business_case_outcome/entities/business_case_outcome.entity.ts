import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity({ name: 'business_case_outcome' })
export class BusinessCaseOutcome {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column({ type:'boolean',default:false })
    payback_priority:boolean;

    @Column({nullable:true})
    payback_orgstandard:number;

    @Column({nullable:true})
    payback_bctarget:number;

    @Column({ type:'boolean',default:false })
    payback_primary:boolean;

    @Column({nullable:true})
    payback_outcome:number;

    @Column({ type:'boolean',default:false })
    npv_gt_priority:boolean;

    @Column({nullable:true})
    npv_gt_orgstandard:number;

    @Column({nullable:true})
    npv_gt_bctarget:number;

    @Column({ type:'boolean',default:false })
    npv_gt_primary:boolean;

    @Column({nullable:true})
    npv_gt_outcome:number;

    @Column({ type:'boolean',default:false })
    sustainabilityindex_priority:boolean;

    @Column({nullable:true})
    sustainabilityindex_orgstandard:number;

    @Column({nullable:true})
    sustainabilityindex_bctarget:number;

    @Column({ type:'boolean',default:false })
    sustainabilityindex_primary:boolean;

    @Column({ type:'boolean',default:false })
    sustainabilityindex_outcome:number;

    @CreateDateColumn()
    created_on:Date;

    @CreateDateColumn()
    updated_on:Date;

    @Column({ type:'boolean',default:false })
    is_deleted:boolean;

}
