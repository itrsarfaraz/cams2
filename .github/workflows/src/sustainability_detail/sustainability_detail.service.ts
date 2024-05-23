import { Injectable } from '@nestjs/common';
import { CreateSustainabilityDetailDto } from './dto/create-sustainability_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SustainabilityDetail } from './entities/sustainability_detail.entity';
import { Repository } from 'typeorm';
import { WriteResponse, paginateResponse } from 'src/shared/response';
import { SustainabilityCategory } from 'src/sustainability_category/entities/sustainability_category.entity';
import { SustainabilityType } from 'src/sustainability_type/entities/sustainability_type.entity';
import { IPagination } from 'src/shared/paginationEum';

@Injectable()
export class SustainabilityDetailService {
  constructor(
    @InjectRepository(SustainabilityDetail)
    private readonly sustainabilityDetailRepo: Repository<SustainabilityDetail>,
    @InjectRepository(SustainabilityCategory)
    private readonly sustainabilityCategoryRepo: Repository<SustainabilityCategory>,
    @InjectRepository(SustainabilityType)
    private readonly sustainabilityTypeRepo: Repository<SustainabilityType>,

  ) { }
  async create(createSustainabilityDetailDto: CreateSustainabilityDetailDto) {
    try {
      const existingSustainabilityDetail = await this.findOne("sustainability_name", createSustainabilityDetailDto.sustainability_name);
      if (existingSustainabilityDetail.data && existingSustainabilityDetail.data.id !== createSustainabilityDetailDto.id) {
        return WriteResponse(403, false, "Sustainability Detail Already Exists.");
      }

      if (!createSustainabilityDetailDto.id) {
        const sustainabilityCategory = await this.sustainabilityCategoryRepo.findOne({
          where: { id: createSustainabilityDetailDto.sustainability_category_id, is_deleted: false },
        });
        const sustainabilityType = await this.sustainabilityTypeRepo.findOne({
          where: { id: createSustainabilityDetailDto.sustainability_type_id, is_deleted: false },
        });
        createSustainabilityDetailDto.sustainability_reference_number = sustainabilityType.abbreviation + "-" + sustainabilityCategory.abbreviation + "-" + createSustainabilityDetailDto.sustainability_name;
      }
      const Responsemsg = createSustainabilityDetailDto.id
        ? "Sustainability Detail Updated Successfully."
        : "Sustainability Detail Created Successfully.";
      const data = await this.sustainabilityDetailRepo.save(createSustainabilityDetailDto);
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }


  //GetAll
  async findAll() {
    try {
      const sustainabilityDetail = await this.sustainabilityDetailRepo.find({
        where: { is_deleted: false },
        relations:['sustainabilityType','sustainabilityDevelopmentGoal','sustainabilityCategory'],
      });

      if (sustainabilityDetail.length > 0) {
        return WriteResponse(200, sustainabilityDetail, 'Sustainability Detail Found Successfully.');
      }
      else {
        return WriteResponse(404, false, 'Sustainability Detail Not Found.');
      }
    } catch (error) {
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');

    }
  }

  async findOne(field: string = 'id', identifier: string) {
    const whereCondition = { is_deleted: false, [field]: identifier };

    const sustainabilityDetail = await this.sustainabilityDetailRepo.findOne({ where: whereCondition, relations:['sustainabilityType','sustainabilityDevelopmentGoal','sustainabilityCategory'] });
    if (!sustainabilityDetail) {
      return WriteResponse(404, false, 'Sustainability Detail Not Found.');
    }
    return WriteResponse(200, sustainabilityDetail, 'Sustainability Detail Found Successfully.');
  }

  //Delete
  async remove(id: string) {
    try {
      const deletedSustainabilityDetail = await this.sustainabilityDetailRepo.findOne({
        where: { id: id, is_deleted: false },
      });
      if (!deletedSustainabilityDetail) {
        return WriteResponse(403, false, 'Sustainability Detail Not found.');
      }
      else {
        await this.sustainabilityDetailRepo.update(id, { is_deleted: true });
        return WriteResponse(200, true, 'Sustainability Detail Deleted Successfully.');
      }
    } catch (error) {
      console.log(error);
      return WriteResponse(500, false, 'Something went Wrong.');
    }
  }

  async pagination(pagination: IPagination): Promise<any> {
    const { curPage, perPage, whereClause } = pagination;
    let lwhereClause = "f.is_deleted = false";
    const fieldsToSearch = [
      "sustainability_reference_number",
      "sustainability_name",
      "description",
    ];
    fieldsToSearch.forEach((field) => {
      const fieldValue = whereClause.find((p) => p.key === field)?.value;
      if (fieldValue) {
        lwhereClause += ` AND f.${field} LIKE '%${fieldValue}%'`;
      }
    });
    // const name = pagination.whereClause.find(
    //   (p: any) => p.key === "name" && p.value,
    // );
    // if (name) {
    //   lwhereClause += ` and riskCategory.name like '${name.value}'`;
    // }
    const allValue = whereClause.find((p) => p.key === "all")?.value;
    if (allValue) {
      const conditions = fieldsToSearch
        .map((field) => `f.${field} LIKE '%${allValue}%'`)
        .join(" OR ");
      lwhereClause += ` AND (${conditions})`;
    }
    const skip = (curPage - 1) * perPage;
    const [list, count] = await this.sustainabilityDetailRepo
      .createQueryBuilder("f")
      .where(lwhereClause)
      .leftJoinAndSelect("f.sustainabilityType", "sustainabilityType")
      .leftJoinAndSelect("f.sustainabilityDevelopmentGoal", "sustainDeveGoal")
      .leftJoinAndSelect("f.sustainabilityCategory", "sustainCategory")
      .skip(skip)
      .take(perPage)
      .orderBy("f.created_on", "DESC")
      .getManyAndCount();
    return paginateResponse(list, count);
  }
}
