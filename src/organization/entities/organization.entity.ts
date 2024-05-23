import { Assumption } from "src/assumptions/entities/assumption.entity";
import { DueDiligenceQuestion } from "src/due_diligence/entities/due_diligence.entity";
import { Role } from "src/role/entities/role.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: "organization" })
export class Organization {
  @PrimaryColumn({ type: "uuid" })
  @Generated("uuid")
  id: string;

  @Column({ nullable: false })
  organization_name: string;

  @Column({ nullable: false })
  lead_contact: string;

  @Column({ nullable: false })
  lead_contact_email: string;

  @Column({ nullable: false })
  licensed_users: number;

  @Column({ nullable: false })
  fathom_version: string;

  @Column({ nullable: false })
  license_expiry: Date;

  @Column({ nullable: false })
  login_code: string;

  @Column()
  logo_file_name: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_on: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_on: Date;

  @Column({ type: "boolean", default: false })
  is_deleted: boolean;

  @Column()
  created_by: string;

  @Column()
  updated_by: string;

  @Column()
  deleted_by: string;

  @OneToMany(() => User, (user) => user.organization)
  user: User[];
  @OneToMany(() => Role, (role) => role.organization)
  role: Role[];
  
  @OneToMany(() => Assumption, (assumption) => assumption.organization)
  assumption: Assumption[];
  
  @OneToMany(() => DueDiligenceQuestion, (dueDiligenceQuestion) => dueDiligenceQuestion.organization)
  dueDiligenceQuestion: DueDiligenceQuestion[];
}
