import { RolePermission } from "src/role_permissions/entities/role_permission.entity";
import { Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: "permissions" })
export class Permission {
  @PrimaryColumn({ type: "uuid" })
  @Generated("uuid")
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  type: string;

  @Column()
  createdBy: string;

  @Column()
  updatedBy: string;

  @Column()
  deletedBy: string;

  @CreateDateColumn()
  created_on: Date;

  @CreateDateColumn()
  updated_on: Date;

  @Column({ type: "boolean", default: false })
  is_deleted: boolean;

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.permission)
  rolePermission: RolePermission;
}
