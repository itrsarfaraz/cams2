import { Injectable } from '@nestjs/common';
import { CreateRolePermissionDto } from './dto/create-role_permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role_permission.dto';
import { WriteResponse } from 'src/shared/response';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermission } from './entities/role_permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolePermissionsService {
  constructor(
    @InjectRepository(RolePermission)
    private readonly rolePermissionRepo: Repository<RolePermission>,
  ) {}
  async create(createRolePermissionDto: CreateRolePermissionDto[]) {
    try {
      const existingData = await this.rolePermissionRepo.find({
        where: { is_deleted: false },
      });
      for (const newRolePermission of createRolePermissionDto) {
        let rolePermissionExists = false;
        for (const existingRolePermission of existingData) {
          if (
            existingRolePermission.permissions_id === newRolePermission.permissions_id &&
            existingRolePermission.role_id === newRolePermission.role_id
          ) {
            await this.rolePermissionRepo.update(existingRolePermission.id, newRolePermission);
            rolePermissionExists = true;
            break; 
          }
        }
        if (!rolePermissionExists) {
          await this.rolePermissionRepo.save(newRolePermission);
          
        }
      }
      return WriteResponse(200, createRolePermissionDto, 'Role-Permission Created Successfully');
    } catch (error) {
      console.log(error);
      return WriteResponse(500, false, 'Something Went Wrong.');
    }
  }

  async findAll() {
    try {
      const rolePermission = await this.rolePermissionRepo.find({
        where: { is_deleted: false },
        relations:['permission','role'],
      });
      if (rolePermission.length > 0) {
        return WriteResponse(200, rolePermission, "Record Found Seccessfully.");
      }
      return WriteResponse(404, [], "Record Not Found");
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }

  async findOne(field: string = "id", identifier: string) {
    var whereCondition = { is_deleted: false, [field]: identifier };
    const rolePermission = await this.rolePermissionRepo.findOne({
      where: whereCondition,
      relations:['permission','role'],

    });
    if (!rolePermission) {
      return WriteResponse(404, false, "User Not Found.");
    }
    return WriteResponse(200, rolePermission, "User Found Successfully.");
  }


  async remove(id: string) {
    try {
      const rolePermission = await this.rolePermissionRepo.findOne({
        where: { id: id, is_deleted: false },
      });
      if (!rolePermission) {
        return WriteResponse(404, [], "Record Not Found");
      }
      await this.rolePermissionRepo.update(id, { is_deleted: true });
      return WriteResponse(200, true, "Record Deleted Successfully.");
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }
}
