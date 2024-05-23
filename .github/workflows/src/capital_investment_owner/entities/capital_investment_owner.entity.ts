import { Entity, PrimaryColumn, Generated, Column, CreateDateColumn } from "typeorm";

@Entity({ name: 'capital_investment_owner' })
export class CapitalInvestmentOwner {
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
