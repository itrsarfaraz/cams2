import { Injectable } from "@nestjs/common";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "./entities/permission.entity";
import { Repository } from "typeorm";
import { WriteResponse } from "src/shared/response";

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) {}
  async create(createPermissionDto: CreatePermissionDto) {
    try {
      const getPermissionName = await this.findOne(
        "name",
        createPermissionDto.name,
      );
      if (
        getPermissionName.data &&
        getPermissionName.data.id !== createPermissionDto.id
      ) {
        return WriteResponse(403, false, "Data Already Exist.");
      }
      const Responsemsg = createPermissionDto.id
        ? "Permission Updated Successfully."
        : "Permission Created Successfully.";

      const data = await this.permissionRepo.save(createPermissionDto);

      return WriteResponse(200, data, Responsemsg);
    } catch (error) {
      console.log(error);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }

  async findAll() {
    try {
      const permission = await this.permissionRepo.find({
        where: { is_deleted: false },
      });
      if (permission.length > 0) {
        return WriteResponse(200, permission, "Record Found Seccessfully.");
      }
      return WriteResponse(404, [], "Record Not Found");
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }

  async findOne(field: string = "id", identifier: string) {
    var whereCondition = { is_deleted: false, [field]: identifier };
    const permission = await this.permissionRepo.findOne({
      where: whereCondition,
    });
    if (!permission) {
      return WriteResponse(404, false, "User Not Found.");
    }
    return WriteResponse(200, permission, "User Found Successfully.");
  }

  async remove(id: string) {
    try {
      const permission = await this.permissionRepo.findOne({
        where: { id: id, is_deleted: false },
      });
      if (!permission) {
        return WriteResponse(404, [], "Record Not Found");
      }
      await this.permissionRepo.update(id, { is_deleted: true });
      return WriteResponse(200, true, "Record Deleted Successfully.");
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
   }
  }
