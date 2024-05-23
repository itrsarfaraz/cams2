import { Injectable } from '@nestjs/common';
import { CreateRoleDto, RoleStatusDTO } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { WriteResponse, paginateResponse } from 'src/shared/response';
import { IPagination } from 'src/shared/paginationEum';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    try {
      const getRoleName = await this.findOne("name",createRoleDto.name);
      if (getRoleName.data && getRoleName.data.id !== createRoleDto.id) {
        return WriteResponse(403, false, "Data Already Exist.");
      }
      const Responsemsg = createRoleDto.id
        ? "Role Updated Successfully."
        : "Role Created Successfully.";

      const data = await this.roleRepo.save(createRoleDto);
     
      return WriteResponse(200, data, Responsemsg);
    } catch (error) {
      console.log(error);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }

  async findAll() {
     try {
       const role = await this.roleRepo.find({
         where: { status:"ACTIVE",is_deleted: false },
         relations: ['organization'],
         order: { created_on: 'asc' }

       });
       if (role.length > 0) {
         return WriteResponse(200, role, "Record Found Seccessfully.");
       }
       return WriteResponse(404, [], "Record Not Found");
     } catch (err) {
       console.log(err);
       return WriteResponse(500, false, "Something Went Wrong.");
     }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} role`;
  // }

  async findOne(field: string = "id", identifier: string) {
    var whereCondition = { status:"ACTIVE",is_deleted: false, [field]: identifier };
    const role = await this.roleRepo.findOne({
      where: whereCondition,
      relations:['organization']
    });
    if (!role) {
      return WriteResponse(404, false, "User Not Found.");
    }
    return WriteResponse(200, role, "User Found Successfully.");
  }

  async remove(id: string) {
   try {
     const role = await this.roleRepo.findOne({
       where: { id: id, is_deleted: false },
     });
     if (!role) {
       return WriteResponse(404, [], "Record Not Found");
     }
     await this.roleRepo.update(id, { is_deleted: true });
     return WriteResponse(200, true, "Record Deleted Successfully.");
   } catch (err) {
     console.log(err);
     return WriteResponse(500, false, "Something Went Wrong.");
   }
  }
  //Role Status
  async rolestatus(roleStatusDTO: RoleStatusDTO, req) {
    try {
      if (
        roleStatusDTO.role_status !== "ACTIVE" &&
        roleStatusDTO.role_status !== "INACTIVE"
    ) {
        return WriteResponse(400,false,"Role status must be either 'ACTIVE' or 'INACTIVE'.");
    }
      const role = await this.roleRepo.find({
        where: {
          id: roleStatusDTO.role_id,
          is_deleted: false,
        },
      });
      if (!role) {
        return WriteResponse(400, false, "Record Not found.");
      }
      await this.roleRepo.update(roleStatusDTO.role_id,{status: roleStatusDTO.role_status});
      return WriteResponse(200, true, "Role Status Changed Successfully.");
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
   }
  }


  async pagination(pagination: IPagination): Promise<any> {
    const { curPage, perPage, whereClause } = pagination;
    let lwhereClause = "f.is_deleted = false";
    const fieldsToSearch = [
      "name"
    ];
    fieldsToSearch.forEach((field) => {
      const fieldValue = whereClause.find((p) => p.key === field)?.value;
      if (fieldValue) {
        lwhereClause += ` AND f.${field} LIKE '%${fieldValue}%'`;
      }
    });
    const status = pagination.whereClause.find(
      (p: any) => p.key === "status" && p.value,
    );
    if (status) {
      lwhereClause += ` and f.status like '${status.value}'`;
    }
    const allValue = whereClause.find((p) => p.key === "all")?.value;
    if (allValue) {
      const conditions = fieldsToSearch
        .map((field) => `f.${field} LIKE '%${allValue}%'`)
        .join(" OR ");
      lwhereClause += ` AND (${conditions})`;
    }
    const skip = (curPage - 1) * perPage;
    const [list, count] = await this.roleRepo
      .createQueryBuilder("f")
      .leftJoinAndSelect("f.user","user")
      .where(lwhereClause)
      .skip(skip)
      .take(perPage)
      .orderBy("f.created_on", "DESC")
      .getManyAndCount();
      const rolesWithUserCount = list.map((role) => ({
        ...role,
        user_count: role.user.length, // Count of users for each role
      }));
      return paginateResponse(rolesWithUserCount, count);
    // return paginateResponse(list, count);
  }

}
