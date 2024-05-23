import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Organization } from "./entities/organization.entity";
import { Repository } from "typeorm";
import { WriteResponse, paginateResponse } from "src/shared/response";
import { IPagination } from "src/shared/paginationEum";
import { serverUrl } from "src/constent";
import * as path from 'path';
import * as fs from 'fs';
import { rename, writeFile } from 'fs/promises'; // Node.js file system module for writing files
import { extname } from "path";


@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepo: Repository<Organization>,
  ) { }
  // async create(createOrganizationDto: CreateOrganizationDto) {
  //   try {
  //     const existingOrganization = await this.findOne(
  //       "organization_name",
  //       createOrganizationDto.organization_name,
  //     );
  //     if (
  //       existingOrganization.data &&
  //       existingOrganization.data.id !== createOrganizationDto.id
  //     ) {
  //       return WriteResponse(403, false, "Organization Name Already Exists.");
  //     }
  //     const Responsemsg = createOrganizationDto.id
  //       ? "Organization Created Successfully."
  //       : "Organization Updated Successfully.";
  //     const data = await this.organizationRepo.save(createOrganizationDto);
  //     return WriteResponse(200, data, Responsemsg);
  //   } catch (err) {
  //     console.log(err);
  //     return WriteResponse(500, false, "Something Went Wrong.");
  //   }
  // }

  async create(createOrganizationDto: CreateOrganizationDto) {
    try {
      // Validate file format (allow only image formats)
      const loginCode = this.generateRandomLoginCode();
      createOrganizationDto.login_code = loginCode;
      if (createOrganizationDto.logo_file) {
        if (!this.validateImageFile(createOrganizationDto.logo_file.originalname)) {
          return WriteResponse(405, false, "Only image files (jpg, jpeg, png, gif) are allowed.");
        }
        const fileExt = extname(createOrganizationDto.logo_file.originalname).toLowerCase();
        const uploadedLogoPath = `public/organization_logos/${createOrganizationDto.logo_file.originalname}`;
        await writeFile(uploadedLogoPath, createOrganizationDto.logo_file.buffer);
        const data = await this.organizationRepo.save(createOrganizationDto);

        const newLogoFileName = `${data.id}${fileExt}`;
        const newPath = `public/organization_logos/${newLogoFileName}`;
        await rename(uploadedLogoPath, newPath);
        const setFileName = await this.organizationRepo.update(data.id, { logo_file_name: newLogoFileName });
        delete data.logo_file;
        return WriteResponse(200, data, "Organization created successfully.");
      } else {
        const data = await this.organizationRepo.save(createOrganizationDto);
        return WriteResponse(200, data, "Organization created successfully.");

      }
    } catch (error) {
      console.error(error);
      return WriteResponse(500, false, "Something went wrong !");
    }
  }

  private validateImageFile(filename: string): boolean {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExt = extname(filename).toLowerCase();
    return allowedExtensions.includes(fileExt);
  }

  generateRandomLoginCode() {
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomAlphabets = "";
    for (let i = 0; i < 2; i++) {
      randomAlphabets += alphabets.charAt(Math.floor(Math.random() * alphabets.length));
    }
    const randomNumbers = Math.floor(10 + Math.random() * 90);
    const loginCode = randomAlphabets + randomNumbers.toString();
    return loginCode;
  }

  async findAll() {
    try {
      const organization = await this.organizationRepo.find({
        where: { is_deleted: false },
        relations: ['user']
      });
      if (organization.length == 0) {
        return WriteResponse(404, [], "Record Not Found");
      }
      organization.map((i) => {
        i["logo_path_url"] = `${serverUrl}public/organization_logos/${i.logo_file_name}`;

      });
      return WriteResponse(200, organization, "Record Found Seccessfully.");
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }

  async findOne(field: string = "id", identifier: string) {
    const whereCondition = { is_deleted: false, [field]: identifier };

    const organization = await this.organizationRepo.findOne({
      where: whereCondition,
      relations: ['user']
    });
    if (!organization) {
      return WriteResponse(404, false, "User Not Found.");
    }
    const imagePath = `organization_logos/${identifier}.jpg`;
    console.log("imagePath-->", imagePath);

    // organization["logo_path_url"] = `${serverUrl}public/organization_logos/${organization.logo_file}`;
    const publicImagePath = path.join(process.cwd(), 'public', imagePath);
    if (fs.existsSync(publicImagePath)) {
      organization['logo_url'] = `${serverUrl}public/` + imagePath;
    } else {
      // Set image to null if it doesn't exist
      organization['logo_url'] = null;
    }
    return WriteResponse(200, organization, "Organization Found Successfully.");
  }

  // async findOne(id: string) {
  //   return `This action returns a #${id} organization`;
  // }

  async remove(id: string) {
    try {
      const organization = await this.organizationRepo.findOne({
        where: { id: id, is_deleted: false },
      });
      if (!organization) {
        return WriteResponse(404, [], "Record Not Found");
      }
      await this.organizationRepo.update(id, { is_deleted: true });
      return WriteResponse(200, true, "Record Deleted Successfully.");
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }

  async pagination(pagination: IPagination): Promise<any> {
    const { curPage, perPage, whereClause } = pagination;
    let lwhereClause = "f.is_deleted = false";
    const fieldsToSearch = ["organization_name", "lead_contact"];
    fieldsToSearch.forEach((field) => {
      const fieldValue = whereClause.find((p) => p.key === field)?.value;
      if (fieldValue) {
        lwhereClause += ` AND f.${field} LIKE '%${fieldValue}%'`;
      }
    });
    const allValue = whereClause.find((p) => p.key === "all")?.value;
    if (allValue) {
      const conditions = fieldsToSearch
        .map((field) => `f.${field} LIKE '%${allValue}%'`)
        .join(" OR ");
      lwhereClause += ` AND (${conditions})`;
    }
    const skip = (curPage - 1) * perPage;
    const [list, count] = await this.organizationRepo
      .createQueryBuilder("f")
      .leftJoinAndSelect('f.user', 'user')
      .where(lwhereClause)
      .skip(skip)
      .take(perPage)
      .orderBy("f.created_on", "DESC")
      .getManyAndCount();

    list.map((i) => {
      i["logo_path_url"] =
        `${serverUrl}public/organization_logos/${i.logo_file_name}`;
    });

    return paginateResponse(list, count);
  }
}
