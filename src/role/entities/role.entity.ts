import { Organization } from "src/organization/entities/organization.entity";
import { RolePermission } from "src/role_permissions/entities/role_permission.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: "role" })
export class Role {
  @PrimaryColumn({ type: "uuid" })
  @Generated("uuid")
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  status: string;

  @Column()
  organization_id: string;

  @Column()
  createdBy:string;

  @Column()
  updatedBy:string;

  @Column()
  deletedBy:string;

  @CreateDateColumn()
  created_on:Date;

  @CreateDateColumn()
  updated_on:Date;

  @Column({ type: "boolean", default: false })
  is_deleted: boolean;
  
  @OneToMany(() => User, (user) => user.role)
  user: User[];

  @ManyToOne(() => Organization, (organization) => organization.role)
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  rolePermission:RolePermission[]
}
