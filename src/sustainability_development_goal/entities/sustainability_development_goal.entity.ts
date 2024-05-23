import { SustainabilityDetail } from "src/sustainability_detail/entities/sustainability_detail.entity";
import { Entity, PrimaryColumn, Generated, Column, CreateDateColumn, OneToMany } from "typeorm";

@Entity({ name: 'sustainability_development_goal' })
export class SustainabilityDevelopmentGoal {
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

    @OneToMany(() => SustainabilityDetail, (sustainabilityDetail) => sustainabilityDetail.sustainabilityDevelopmentGoal)
    sustainabilityDetail:SustainabilityDetail
}
