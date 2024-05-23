import { BusinessCaseAssumption } from 'src/business_case_assumptions/entities/business_case_assumption.entity';
import { OrganisationAssumptionFieldType } from 'src/organisation_assumption_field_types/entities/organisation_assumption_field_type.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryColumn,
    Generated,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

@Entity({ name: 'assumptions' })
export class Assumption {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column({ nullable: false })
    field_type_id: string;

    @Column({ nullable: true })
    default_value: string;

    @Column({ nullable: false })
    organisation_id: string;

    @Column({ nullable: true })
    assumptions_type: string;

    @CreateDateColumn()
    created_on: Date;

    @CreateDateColumn()
    updated_on: Date;

    @Column({ type: 'boolean', default: false })
    is_locked: boolean;

    @Column({ type: 'boolean', default: false })
    is_deleted: boolean;

    @OneToMany(() => BusinessCaseAssumption, (businessCaseAssumption) => businessCaseAssumption.assumption)
    businessCaseAssumption: BusinessCaseAssumption[];

    @ManyToOne(() => OrganisationAssumptionFieldType, (organisationAssumptionFieldType) => organisationAssumptionFieldType.assumption)
    @JoinColumn({ name: 'field_type_id' })
    organisationAssumptionFieldType: OrganisationAssumptionFieldType;

    @ManyToOne(() => Organization, (organization) => organization.assumption)
    @JoinColumn({ name: 'organisation_id' })
    organization: Organization;
}
