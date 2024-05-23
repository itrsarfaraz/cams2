import { Organization } from 'src/organization/entities/organization.entity';
import { Role } from 'src/role/entities/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryColumn,
  Generated,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  user_name: string;

  @Column()
  organization_id: string

  @Column({ nullable: false })
  surname: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false, default: null })
  password: string;

  @Column({ nullable: false })
  job_title: string;

  @Column({ nullable: false })
  role_id: string;

  @Column({ type: 'boolean', default: false })
  force_login: boolean;

  @Column({ nullable: false })
  state: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ nullable: true })
  deactivated_reason: string;

  @Column({ nullable: true })
  login_attempt: number;

  @Column({ nullable: true })
  login_time: Date;

  @CreateDateColumn()
  created_on: Date;

  @CreateDateColumn()
  updated_on: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;


  @ManyToOne(() => Organization, (organization) => organization.user)
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @ManyToOne(() => Role, (role) => role.user)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => ActivityLog, (activityLog) => activityLog.user)
  activityLog: ActivityLog[];

}

@Entity({ name: 'activity_logs' })
export class ActivityLog {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  id: string;

  @Column()
  activity: string;

  @Column()
  type: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  activity_date: Date;

  @CreateDateColumn()
  created_on: Date;

  @CreateDateColumn()
  updated_on: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @ManyToOne(() => User, (user) => user.activityLog)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
