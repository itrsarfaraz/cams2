import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

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
