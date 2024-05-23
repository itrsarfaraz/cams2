import { ComponentDetail } from 'src/component_detail/entities/component_detail.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    PrimaryColumn,
    Generated,
  } from 'typeorm';
@Entity({ name: 'component_types' })
export class ComponentTypes {
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

    @OneToMany(() => ComponentDetail, (componentDetail) => componentDetail.componentTypes)
    componentDetail: ComponentDetail[];


}

