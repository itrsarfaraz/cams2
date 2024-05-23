import { SustainabilityCategory } from "src/sustainability_category/entities/sustainability_category.entity";
import { SustainabilityDevelopmentGoal } from "src/sustainability_development_goal/entities/sustainability_development_goal.entity";
import { SustainabilityType } from "src/sustainability_type/entities/sustainability_type.entity";
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({name:'sustainability_detail'})
export class SustainabilityDetail {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column({nullable:true})
    sustainability_reference_number:string;

    @Column({nullable:false})
    sustainability_name:string;

    @Column({nullable:false})
    sustainability_type_id:string;

    @Column({nullable:false})
    sustainability_category_id:string;

    @Column({nullable:false})
    sustainable_development_goal_id:string;

    @Column({nullable:false})
    description:string;

    @Column({nullable:false})
    assigned_to:string;

    @Column({nullable:false})
    review_frequency:Date;

    @Column({nullable:false})
    qualitative_or_quantitative_measure:string;

    @Column({nullable:false})
    hact_social_value_calculation:number;

    @Column({nullable:false})
    hact_social_internal_rate_of_return:number;

    @Column({nullable:false})
    kpi_measure:string;

    @CreateDateColumn()
    created_on:Date;

    @CreateDateColumn()
    updated_on:Date;

    @Column({type:'boolean',default:false})
    is_deleted:boolean;

    @ManyToOne(() => SustainabilityType, (sustainabilityType) => sustainabilityType.sustainabilityDetail)
    @JoinColumn({ name: 'sustainability_type_id' })
    sustainabilityType: SustainabilityType;

    @ManyToOne(() => SustainabilityCategory, (sustainabilityCategory) => sustainabilityCategory.sustainabilityDetail)
    @JoinColumn({ name: 'sustainability_category_id' })
    sustainabilityCategory: SustainabilityCategory;

    @ManyToOne(() => SustainabilityDevelopmentGoal, (sustainabilityDevelopmentGoal) => sustainabilityDevelopmentGoal.sustainabilityDetail)
    @JoinColumn({ name: 'sustainable_development_goal_id' })
    sustainabilityDevelopmentGoal: SustainabilityDevelopmentGoal;

}
