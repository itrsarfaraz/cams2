import { Assumption } from 'src/assumptions/entities/assumption.entity';
import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryColumn,
    Generated,
    OneToMany,
} from 'typeorm';

@Entity({ name: 'organisation_assumption_field_types' })
export class OrganisationAssumptionFieldType {
    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column({ nullable: true })
    field_name: string;

    @Column({ nullable: true })
    field_type: string;

    @Column({ nullable: true })
    type: string;

    @CreateDateColumn()
    created_on: Date;

    @CreateDateColumn()
    updated_on: Date;

    @Column({ type: 'boolean', default: false })
    is_deleted: boolean;

    @OneToMany(() => Assumption, (assumption) => assumption.organisationAssumptionFieldType)
    assumption: Assumption[]

}