import { Injectable } from "@nestjs/common";
import {
  CreateRiskDetailDto,
  QuickExtendDTO,
  RiskStatusDTO,
} from "./dto/create-risk_detail.dto";
import { UpdateRiskDetailDto } from "./dto/update-risk_detail.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { RiskDetail } from "./entities/risk_detail.entity";
import { In, LessThan, Repository } from "typeorm";
import { WriteResponse, paginateResponse } from "src/shared/response";
import { IPagination } from "src/shared/paginationEum";
import { RiskCategory } from "src/risk_category/entities/risk_category.entity";
import { ActivityLog } from "src/activity_logs/entities/activity_log.entity";

@Injectable()
export class RiskDetailService {
  constructor(
    @InjectRepository(RiskDetail)
    private readonly riskDetailRepo: Repository<RiskDetail>,
    @InjectRepository(RiskCategory)
    private readonly riskCategoryRepo: Repository<RiskCategory>,
    @InjectRepository(ActivityLog)
    private readonly activityRepository: Repository<ActivityLog>,
  ) {}
  async create(createRiskDetailDto: CreateRiskDetailDto,req) {
    try {
      const userId = req.user.id;
      let activity = createRiskDetailDto.id ? "Update Risk" : "Create New Risk";
      const existingRiskDetail = await this.findOne(
        "risk_name",
        createRiskDetailDto.risk_name,
      );
      if (
        existingRiskDetail.data &&
        existingRiskDetail.data.id !== createRiskDetailDto.id
      ) {
        return WriteResponse(403, false, "Risk Detail Already Exists.");
      }

      if (!createRiskDetailDto.id) {
          const riskCategory = await this.riskCategoryRepo.findOne({
            where: { id: createRiskDetailDto.risk_category_id, is_deleted: false },
          });
        var randomText = generateRandomString();
        var riskReferencePrefix = createRiskDetailDto.risk_type === 'Asset Risk' ? 'AR' : 'NonAR';
        createRiskDetailDto.risk_reference_number = riskReferencePrefix +"-" + riskCategory.abbreviation + "-" + createRiskDetailDto.risk_name + "-" + randomText;
      }
      const Responsemsg = createRiskDetailDto.id
        ? "Risk Detail Updated Successfully."
        : "Risk Detail Created Successfully.";
      const data = await this.riskDetailRepo.save(createRiskDetailDto);
      if(data){
        await this.activityRepository.save({ activity, user_id: userId, type: "risk-detail" });
      }
      return WriteResponse(200, data, Responsemsg);
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something went Wrong.");
    }
  }
  //GetAll
  async findAll() {
    try {
      const riskDetail = await this.riskDetailRepo.find({
        where: { is_deleted: false },
      });
      if (riskDetail.length > 0) {
        return WriteResponse(200,riskDetail,"Risk Detail Found Successfully.");
      } else {
        return WriteResponse(404, false, "Risk Detail Not Found.");
      }
    } catch (error) {
      console.log(error);
      return WriteResponse(500, false, "Something went Wrong.");
    }
  }
  async findOne(field: string = "id", identifier: string) {
    const whereCondition = { is_deleted: false, [field]: identifier };

    const riskDetail = await this.riskDetailRepo.findOne({
      where: whereCondition,
    });
    if (!riskDetail) {
      return WriteResponse(404, false, "Risk Detail Not Found.");
    }
    return WriteResponse(200, riskDetail, "Risk Detail Found Successfully.");
  }
  //Delete
  async remove(id: string,req) {
    try {
      const userId = req.user.id;
      let activity = "Delete Risk";
      const deletedRiskDetail = await this.riskDetailRepo.findOne({
        where: { id: id, is_deleted: false },
      });
      if (!deletedRiskDetail) {
        return WriteResponse(403, false, "Risk Detail Not found.");
      } else {
        await this.riskDetailRepo.update(id, { is_deleted: true });
        await this.activityRepository.save({ activity, user_id: userId, type: "risk-detail" });
        return WriteResponse(200, true, "Risk Detail Deleted Successfully.");
      }
    } catch (error) {
      console.log(error);
      return WriteResponse(500, false, "Something went Wrong.");
    }
  }
  // Risk Status
  async riskStatus(riskStatusDTO: RiskStatusDTO, req) {
    try{
      const userId = req.user.id;
      let activity = "Risk Status Change";
    const riskDetailStatus = await this.riskDetailRepo.find({
      where: {
        id: In(riskStatusDTO.riskDetails_ids),
        is_deleted: false,
      },
    });
    if (!riskDetailStatus) {
      return WriteResponse(400, false, "Record Not found.");
    }
    await this.riskDetailRepo.update(riskStatusDTO.riskDetails_ids, {
      risk_status: riskStatusDTO.risk_status,
    });
    await this.activityRepository.save({ activity, user_id: userId, type: "risk-detail" });
    return WriteResponse(200, true, "Risk Status Changed Successfully.");
  }catch(err){
    console.log(err);
    return WriteResponse(500,false,'Something Went Wrong')
    
  }
  }
  // Quick Extend year
  async quickExtend(quickExtendDTO: QuickExtendDTO, req) {
    try{
      const userId = req.user.id;
      let activity = "Extend Review Date";
    const riskReviewDate = await this.riskDetailRepo.find({
      where: {
        id: In(quickExtendDTO.riskDetails_ids),
        is_deleted: false,
      },
    });
    if (!riskReviewDate || riskReviewDate.length === 0) {
      return WriteResponse(400, false, "Records not found.");
    }
    const updatedRiskDetails = riskReviewDate.map((risk) => {
      const currentReviewDate = new Date(risk.review_frequency);
      const newReviewDate = new Date(
        currentReviewDate.getFullYear() + 1,
        currentReviewDate.getMonth(),
        currentReviewDate.getDate(),
      );
      return { id: risk.id, review_frequency: newReviewDate };
    });
    await this.riskDetailRepo.save(updatedRiskDetails);
    await this.activityRepository.save({ activity, user_id: userId, type: "risk-detail" });
    return WriteResponse(200, true, "Review Date Extended.");
  }catch(err){
    console.log(err);
    return WriteResponse(500,false,'Something Went Wrong')
    
  }
  }
// Dashboard
  async dashboard() {
    try {
      const currentDate = new Date();
      const activeRiskCount = await this.riskDetailRepo.count({
        where: { risk_status: "ACTIVE", is_deleted: false },
      });
      const archivedRiskCount = await this.riskDetailRepo.count({
        where: { risk_status: "ARCHIVED", is_deleted: false },
      });
      const expireRiskCount = await this.riskDetailRepo.count({
        where: {
          review_frequency: LessThan(currentDate),
          is_deleted: false,
        },
      });
      const allRisk = await this.riskDetailRepo.count({
        where: { is_deleted: false },
      });
      return WriteResponse(200, {
        active_Risk: activeRiskCount,
        archived_Risk: archivedRiskCount,
        reviewing_Risk: expireRiskCount,
        all_Risk: allRisk,
      });
    } catch (err) {
      console.log(err);
      return WriteResponse(500, false, "Something Went Wrong.");
    }
  }

  //Pagination
  async pagination(pagination: IPagination): Promise<any> {
    const { curPage, perPage, whereClause } = pagination;
    let lwhereClause = "f.is_deleted = false";
    const fieldsToSearch = [
      "risk_reference_number",
      "risk_name",
      "risk_status",
    ];
    fieldsToSearch.forEach((field) => {
      const fieldValue = whereClause.find((p) => p.key === field)?.value;
      if (fieldValue) {
        lwhereClause += ` AND f.${field} LIKE '%${fieldValue}%'`;
      }
    });
    const name = pagination.whereClause.find(
      (p: any) => p.key === "name" && p.value,
    );
    if (name) {
      lwhereClause += ` and riskCategory.name like '${name.value}'`;
    }
    const allValue = whereClause.find((p) => p.key === "all")?.value;
    if (allValue) {
      const conditions = fieldsToSearch
        .map((field) => `f.${field} LIKE '%${allValue}%'`)
        .join(" OR ");
      lwhereClause += ` AND (${conditions})`;
    }
    const skip = (curPage - 1) * perPage;
    const [list, count] = await this.riskDetailRepo
      .createQueryBuilder("f")
      .leftJoinAndSelect("f.riskCategory", "riskCategory")
      .where(lwhereClause)
      .skip(skip)
      .take(perPage)
      .orderBy("f.created_on", "DESC")
      .getManyAndCount();
    return paginateResponse(list, count);
  }
}

function generateRandomString(): string {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomTaxt = "";

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomTaxt += charset[randomIndex];
  }

  return randomTaxt;
}
