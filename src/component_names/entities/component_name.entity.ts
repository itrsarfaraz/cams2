import { ComponentDetail } from 'src/component_detail/entities/component_detail.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
@Entity({ name: 'component_names' })
export class ComponentName {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  component_type_id: string;

  @CreateDateColumn()
  created_on: Date;

  @CreateDateColumn()
  updated_on: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @OneToMany(() => ComponentDetail, (componentDetail) => componentDetail.componentName)
  componentDetail: ComponentDetail[];
}
