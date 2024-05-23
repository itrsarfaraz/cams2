import { Permission } from "src/permissions/entities/permission.entity";
import { Role } from "src/role/entities/role.entity";
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({name:'role_permissions'})
export class RolePermission {
  @PrimaryColumn({ type: "uuid" })
  @Generated("uuid")
  id: string;

  // @Column({ nullable: true })
  // name: string;

  @Column({ nullable: true })
  role_id: string;

  @Column({ nullable: true })
  permissions_id: string;

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

  @ManyToOne(() => Role, (role) => role.rolePermission)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.rolePermission)
  @JoinColumn({ name: 'permissions_id' })
  permission: Permission;
}
