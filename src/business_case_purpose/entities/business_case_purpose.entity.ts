import { PrimaryColumn, Generated, Column, Entity, CreateDateColumn } from "typeorm";

@Entity({ name: 'business_case_purpose' })
export class BusinessCasePurpose {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column({nullable:false})
    name:string;

    @CreateDateColumn()
    created_on: Date;
  
    @CreateDateColumn()
    updated_on: Date;
  
    @Column({ type: 'boolean', default: false })
    is_deleted: boolean;
}
